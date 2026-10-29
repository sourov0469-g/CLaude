(() => {
  const form = document.querySelector('[data-contact-form]');

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const formView = document.querySelector('[data-contact-form-view]');
  const successView = document.querySelector('[data-contact-success]');
  const contactStateLabel = document.querySelector('[data-contact-state-label]');
  const contactStatus = document.querySelector('[data-contact-status]');
  const resetButton = document.querySelector('[data-contact-reset]');
  const contactError = form.querySelector('[data-contact-error]');
  const submitButton = form.querySelector('button[type="submit"]');
  const submitButtonLabel = submitButton?.querySelector('[data-button-label]');
  const submitButtonIdleText =
    submitButtonLabel instanceof HTMLElement ? submitButtonLabel.textContent.trim() : 'Send';
  const submitButtonLoadingText =
    submitButton instanceof HTMLButtonElement
      ? submitButton.dataset.buttonLoadingText || 'Sending'
      : 'Sending';
  const turnstileContainer = form.querySelector('[data-turnstile-container]');
  const endpoint = form.dataset.contactEndpoint || '/api/contact.php';
  const turnstileSiteKey = form.dataset.turnstileSiteKey || '';
  const turnstileAction = form.dataset.turnstileAction || 'contact_form';
  const turnstileScriptUrl =
    'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  const turnstileScriptTimeoutMs = 12000;
  const turnstileTokenTimeoutMs = 45000;
  const fieldRules = {
    name: { min: 2, max: 120, requiredMessage: 'Enter your name' },
    email: { max: 254, requiredMessage: 'Enter your email address' },
    context: { min: 2, max: 160, requiredMessage: 'Add project context' },
    message: {
      min: 10,
      max: 4000,
      requiredMessage: 'Write a short message',
      minMessage: 'Write at least 10 characters',
    },
  };
  let turnstileLoadPromise = null;
  let turnstileWidgetId = null;
  let turnstileToken = '';
  let turnstileTokenResolve = null;
  let turnstileTokenReject = null;
  let turnstileTokenTimer = 0;
  let turnstileResizeObserver = null;

  const setStatus = (message = '') => {
    if (contactStatus instanceof HTMLElement) {
      contactStatus.textContent = message;
    }
  };

  const setFormError = (message = '') => {
    if (!(contactError instanceof HTMLElement)) {
      return;
    }

    contactError.textContent = message;
    contactError.hidden = message === '';
  };

  const getControls = () =>
    Array.from(form.elements).filter(
      (element) =>
        (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) &&
        !element.matches('[data-contact-honeypot]'),
    );

  const getHoneypot = () => {
    const honeypot = form.elements.namedItem('website');
    return honeypot instanceof HTMLInputElement ? honeypot : null;
  };

  const getFieldValue = (name) => {
    const field = form.elements.namedItem(name);

    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      return field.value;
    }

    return '';
  };

  const syncFilledState = (control) => {
    const field = control.closest('.site-field');

    if (field instanceof HTMLElement) {
      field.dataset.fieldFilled = String(control.value.trim().length > 0);
    }
  };

  const syncFilledStates = () => {
    getControls().forEach(syncFilledState);
  };

  const clearValidation = () => {
    setFormError('');

    form.querySelectorAll('.site-field[data-field-state]').forEach((field) => {
      delete field.dataset.fieldState;
    });

    getControls().forEach((control) => {
      control.setCustomValidity('');
      control.removeAttribute('aria-invalid');
      syncFilledState(control);
    });
  };

  const setSubmitting = (isSubmitting) => {
    const controls = getControls();

    form.dataset.formState = isSubmitting ? 'submitting' : 'idle';

    controls.forEach((control) => {
      control.disabled = isSubmitting;
    });

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = isSubmitting;

      if (isSubmitting) {
        submitButton.setAttribute('aria-busy', 'true');
        submitButton.dataset.buttonState = 'loading';
      } else {
        submitButton.removeAttribute('aria-busy');
        delete submitButton.dataset.buttonState;
      }

      if (submitButtonLabel instanceof HTMLElement) {
        submitButtonLabel.textContent = isSubmitting
          ? submitButtonLoadingText
          : submitButtonIdleText;
      }
    }

    if (isSubmitting) {
      form.setAttribute('aria-busy', 'true');
      setStatus('Sending message.');
    } else {
      form.removeAttribute('aria-busy');
    }
  };

  const showSuccess = () => {
    if (formView instanceof HTMLElement) {
      formView.hidden = true;
    }

    if (successView instanceof HTMLElement) {
      successView.hidden = false;
    }

    if (contactStateLabel instanceof HTMLElement) {
      contactStateLabel.textContent = 'Sent';
    }

    setStatus('Message received. I’ll get back to you soon.');

    if (resetButton instanceof HTMLElement) {
      requestAnimationFrame(() => {
        resetButton.focus({ preventScroll: true });
      });
    }
  };

  const showFormView = () => {
    if (formView instanceof HTMLElement) {
      formView.hidden = false;
    }

    if (successView instanceof HTMLElement) {
      successView.hidden = true;
    }

    if (contactStateLabel instanceof HTMLElement) {
      contactStateLabel.textContent = 'Contact';
    }
  };

  const resolvePendingTurnstile = (token) => {
    window.clearTimeout(turnstileTokenTimer);
    turnstileTokenTimer = 0;

    if (turnstileTokenResolve) {
      turnstileTokenResolve(token);
    }

    turnstileTokenResolve = null;
    turnstileTokenReject = null;
  };

  const setTurnstileVisible = (isVisible) => {
    if (!(turnstileContainer instanceof HTMLElement)) {
      return;
    }

    if (isVisible) {
      turnstileContainer.dataset.turnstileVisible = 'true';
    } else {
      delete turnstileContainer.dataset.turnstileVisible;
    }
  };

  const rejectPendingTurnstile = (error = new Error('turnstile_failed')) => {
    window.clearTimeout(turnstileTokenTimer);
    turnstileTokenTimer = 0;

    if (turnstileTokenReject) {
      turnstileTokenReject(error);
    }

    turnstileTokenResolve = null;
    turnstileTokenReject = null;
  };

  const resetTurnstile = () => {
    turnstileToken = '';

    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
    }

    setTurnstileVisible(false);
  };

  const syncTurnstileVisibility = () => {
    if (!(turnstileContainer instanceof HTMLElement)) {
      return;
    }

    const isVisible = turnstileContainer.offsetHeight > 1;

    if (isVisible) {
      turnstileContainer.dataset.turnstileVisible = 'true';
    } else {
      delete turnstileContainer.dataset.turnstileVisible;
    }
  };

  const watchTurnstileVisibility = () => {
    if (
      !(turnstileContainer instanceof HTMLElement) ||
      typeof ResizeObserver === 'undefined' ||
      turnstileResizeObserver !== null
    ) {
      syncTurnstileVisibility();
      return;
    }

    turnstileResizeObserver = new ResizeObserver(syncTurnstileVisibility);
    turnstileResizeObserver.observe(turnstileContainer);
    syncTurnstileVisibility();
  };

  const loadTurnstile = () => {
    if (window.turnstile) {
      return Promise.resolve(window.turnstile);
    }

    if (turnstileLoadPromise) {
      return turnstileLoadPromise;
    }

    turnstileLoadPromise = new Promise((resolve, reject) => {
      const callbackName = '__specia1neTurnstileReady';
      const existingScript = document.querySelector('[data-turnstile-script]');
      let scriptLoadTimer = 0;

      const clearScriptLoadTimer = () => {
        window.clearTimeout(scriptLoadTimer);
        scriptLoadTimer = 0;
      };

      const failScriptLoad = (script, error) => {
        clearScriptLoadTimer();

        if (script instanceof HTMLScriptElement) {
          script.dataset.turnstileScriptState = 'error';
          script.remove();
        }

        reject(error);
      };

      const markScriptReady = () => {
        clearScriptLoadTimer();

        const script = document.querySelector('[data-turnstile-script]');

        if (script instanceof HTMLScriptElement) {
          script.dataset.turnstileScriptState = 'ready';
        }
      };

      window[callbackName] = () => {
        if (window.turnstile) {
          markScriptReady();
          resolve(window.turnstile);
        } else {
          failScriptLoad(
            document.querySelector('[data-turnstile-script]'),
            new Error('turnstile_missing'),
          );
        }
      };

      if (existingScript instanceof HTMLScriptElement) {
        if (existingScript.dataset.turnstileScriptState === 'error') {
          existingScript.remove();
        } else if (window.turnstile) {
          resolve(window.turnstile);
          return;
        } else {
          existingScript.addEventListener('load', window[callbackName], { once: true });
          existingScript.addEventListener(
            'error',
            () => failScriptLoad(existingScript, new Error('turnstile_load_failed')),
            { once: true },
          );
          scriptLoadTimer = window.setTimeout(() => {
            failScriptLoad(existingScript, new Error('turnstile_load_timeout'));
          }, turnstileScriptTimeoutMs);
          return;
        }
      }

      const script = document.createElement('script');
      script.src = `${turnstileScriptUrl}&onload=${callbackName}`;
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      script.dataset.turnstileScriptState = 'loading';
      script.onerror = () => {
        failScriptLoad(script, new Error('turnstile_load_failed'));
      };
      scriptLoadTimer = window.setTimeout(() => {
        failScriptLoad(script, new Error('turnstile_load_timeout'));
      }, turnstileScriptTimeoutMs);
      document.head.append(script);
    }).catch((error) => {
      turnstileLoadPromise = null;
      throw error;
    });

    return turnstileLoadPromise;
  };

  const ensureTurnstile = async () => {
    if (!turnstileSiteKey || !(turnstileContainer instanceof HTMLElement)) {
      throw new Error('turnstile_unconfigured');
    }

    const turnstile = await loadTurnstile();

    if (turnstileWidgetId === null) {
      turnstileWidgetId = turnstile.render(turnstileContainer, {
        sitekey: turnstileSiteKey,
        action: turnstileAction,
        appearance: 'interaction-only',
        execution: 'execute',
        size: 'flexible',
        theme: 'dark',
        callback: (token) => {
          turnstileToken = token;
          resolvePendingTurnstile(token);
        },
        'expired-callback': () => {
          turnstileToken = '';
          rejectPendingTurnstile(new Error('turnstile_expired'));
        },
        'error-callback': () => {
          turnstileToken = '';
          rejectPendingTurnstile(new Error('turnstile_failed'));
        },
        'timeout-callback': () => {
          turnstileToken = '';
          rejectPendingTurnstile(new Error('turnstile_timeout'));
        },
        'before-interactive-callback': () => {
          setTurnstileVisible(true);
        },
        'after-interactive-callback': () => {
          setTurnstileVisible(false);
        },
        'unsupported-callback': () => {
          turnstileToken = '';
          rejectPendingTurnstile(new Error('turnstile_unsupported'));
        },
      });

      watchTurnstileVisibility();
    }

    return turnstile;
  };

  const requestTurnstileToken = async () => {
    if (turnstileToken) {
      return turnstileToken;
    }

    return new Promise((resolve, reject) => {
      let settled = false;

      const resolveRequest = (token) => {
        if (settled) {
          return;
        }

        settled = true;
        resolve(token);
      };

      const rejectRequest = (error) => {
        if (settled) {
          return;
        }

        settled = true;
        window.clearTimeout(turnstileTokenTimer);
        turnstileTokenTimer = 0;
        turnstileTokenReject = null;
        turnstileTokenResolve = null;
        reject(error);
      };

      window.clearTimeout(turnstileTokenTimer);
      turnstileTokenTimer = window.setTimeout(() => {
        rejectRequest(new Error('turnstile_timeout'));
      }, turnstileTokenTimeoutMs);

      ensureTurnstile()
        .then((turnstile) => {
          if (settled) {
            return;
          }

          turnstileTokenResolve = resolveRequest;
          turnstileTokenReject = rejectRequest;
          turnstile.execute(turnstileWidgetId);
        })
        .catch(rejectRequest);
    });
  };

  const clearContactValidation = () => {
    setSubmitting(false);
    clearValidation();
    resetTurnstile();
    setStatus('');

    if (successView instanceof HTMLElement && !successView.hidden) {
      showFormView();
    }

    requestAnimationFrame(syncFilledStates);
    window.setTimeout(syncFilledStates, 120);
  };

  const resetContactForm = () => {
    form.reset();
    clearContactValidation();
    showFormView();
  };

  const validateControl = (control, revealError = false) => {
    const field = control.closest('.site-field');
    const message = field?.querySelector('.site-field__message');
    const value = control.value.trim();
    const rules = fieldRules[control.name] || {};

    control.setCustomValidity('');

    if (control.required && value.length === 0) {
      control.setCustomValidity(
        control.dataset.requiredMessage || rules.requiredMessage || 'Complete this field',
      );
    } else if (
      control instanceof HTMLInputElement &&
      control.type === 'email' &&
      control.validity.typeMismatch
    ) {
      control.setCustomValidity(control.dataset.invalidMessage || 'Enter a valid email address');
    } else if (rules.min && value.length < rules.min) {
      control.setCustomValidity(
        control.dataset.minMessage || rules.minMessage || `Use at least ${rules.min} characters`,
      );
    } else if (rules.max && value.length > rules.max) {
      control.setCustomValidity(`Use ${rules.max} characters or fewer`);
    }

    const errorMessage = control.validationMessage;
    const isInvalid = !control.checkValidity();

    if (message instanceof HTMLElement && errorMessage) {
      message.textContent = errorMessage;
    }

    if (isInvalid) {
      control.setAttribute('aria-invalid', 'true');
    } else {
      control.removeAttribute('aria-invalid');
    }

    if (field instanceof HTMLElement) {
      if (isInvalid && revealError) {
        field.dataset.fieldState = 'invalid';
      } else if (!isInvalid) {
        delete field.dataset.fieldState;
      }
    }

    return !isInvalid;
  };

  const buildPayload = (token) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    return {
      name: getFieldValue('name'),
      email: getFieldValue('email'),
      context: getFieldValue('context'),
      message: getFieldValue('message'),
      website: getHoneypot()?.value || '',
      turnstileToken: token,
      sourcePath: `${window.location.pathname}${window.location.search}`,
      locale: navigator.language || '',
      timezone,
    };
  };

  const submitPayload = async (payload) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });

    let result;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok || !result?.ok) {
      throw new Error(
        result?.error || 'Message could not be sent right now. Please try again later.',
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.dataset.formState === 'submitting') {
      return;
    }

    setFormError('');

    let invalidControl = null;

    getControls().forEach((control) => {
      const isValid = validateControl(control, true);

      if (!isValid && invalidControl === null) {
        invalidControl = control;
      }
    });

    if (invalidControl instanceof HTMLElement) {
      setStatus('Please complete the highlighted fields.');
      invalidControl.focus({ preventScroll: true });
      return;
    }

    setSubmitting(true);

    try {
      setStatus('Completing security check.');
      const token = await requestTurnstileToken();
      setStatus('Sending message.');
      await submitPayload(buildPayload(token));
      setSubmitting(false);
      resetTurnstile();
      form.reset();
      clearValidation();
      requestAnimationFrame(syncFilledStates);
      showSuccess();
    } catch (error) {
      setSubmitting(false);
      resetTurnstile();
      const errorMessage =
        error instanceof Error && error.message && error.message.startsWith('turnstile_')
          ? 'Security check failed. Please try again.'
          : error instanceof Error && error.message
          ? error.message
          : 'Message could not be sent right now. Please try again later.';

      setStatus(errorMessage);
      setFormError(errorMessage);
    }
  };

  const handleInput = (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    if (target.matches('[data-contact-honeypot]')) {
      return;
    }

    const field = target.closest('.site-field');

    syncFilledState(target);
    validateControl(target, field instanceof HTMLElement && field.dataset.fieldState === 'invalid');
  };

  const scheduleFilledStateSync = () => {
    requestAnimationFrame(syncFilledStates);
    window.setTimeout(syncFilledStates, 120);
    window.setTimeout(syncFilledStates, 500);
  };

  const handleAnimationStart = (event) => {
    if (event.animationName !== 'site-field-autofill') {
      return;
    }

    const target = event.target;

    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      window.setTimeout(() => {
        syncFilledState(target);
        validateControl(target);
      }, 0);
    }
  };

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', handleInput);
  form.addEventListener('change', scheduleFilledStateSync);
  form.addEventListener('focusout', scheduleFilledStateSync);
  form.addEventListener('animationstart', handleAnimationStart);
  const primeTurnstile = () => {
    if (turnstileSiteKey) {
      ensureTurnstile().catch(() => {});
    }
  };

  ['focusin', 'pointerdown', 'touchstart', 'mouseenter'].forEach((eventName) => {
    form.addEventListener(eventName, primeTurnstile, { once: true, passive: true });
  });

  form.addEventListener('keydown', primeTurnstile, { once: true });
  window.addEventListener('pageshow', scheduleFilledStateSync);
  document.addEventListener('site:contact-form-reset', resetContactForm);
  document.addEventListener('site:contact-validation-reset', clearContactValidation);

  if (resetButton instanceof HTMLElement) {
    resetButton.addEventListener('click', resetContactForm);
  }

  syncFilledStates();
})();
