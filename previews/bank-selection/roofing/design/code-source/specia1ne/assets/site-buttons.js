const buttonViewport = window.matchMedia('(hover: hover) and (pointer: fine)');

{
  let activeButton = null;
  let activeScope = null;
  let isEnabled = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getButton = (target) => {
    if (!(target instanceof Element)) {
      return null;
    }

    const button = target.closest('.site-button');

    if (
      button instanceof HTMLElement &&
      !button.matches(':disabled, [aria-disabled="true"]')
    ) {
      return button;
    }

    return null;
  };

  const getMotionScope = (button) => button.closest('[data-reveal-shell]');

  const readPixelValue = (element, property, fallback) => {
    const value = getComputedStyle(element).getPropertyValue(property).trim();
    const parsed = Number.parseFloat(value);

    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const clearTargetMotion = (target) => {
    target.style.removeProperty('--site-button-bracket-x');
    target.style.removeProperty('--site-button-bracket-y');
  };

  const clearButtonMotion = () => {
    if (activeButton instanceof HTMLElement) {
      clearTargetMotion(activeButton);
    }

    if (activeScope instanceof HTMLElement) {
      clearTargetMotion(activeScope);
      delete activeScope.dataset.siteButtonMotionActive;
    }

    activeButton = null;
    activeScope = null;
  };

  const syncButtonMotion = (button, event) => {
    if (button !== activeButton || button.closest('[data-reveal-shell]') !== activeScope) {
      clearButtonMotion();
      activeButton = button;
      activeScope = getMotionScope(button);
    }

    const rect = button.getBoundingClientRect();
    const halfWidth = Math.max(rect.width / 2, 1);
    const halfHeight = Math.max(rect.height / 2, 1);
    const x = clamp((event.clientX - (rect.left + halfWidth)) / halfWidth, -1, 1);
    const y = clamp((event.clientY - (rect.top + halfHeight)) / halfHeight, -1, 1);
    const motionX = readPixelValue(button, '--site-button-motion-x', 3);
    const motionY = readPixelValue(button, '--site-button-motion-y', 1.5);
    const bracketX = `${x * motionX}px`;
    const bracketY = `${y * motionY}px`;

    button.style.setProperty('--site-button-bracket-x', bracketX);
    button.style.setProperty('--site-button-bracket-y', bracketY);

    if (activeScope instanceof HTMLElement) {
      activeScope.dataset.siteButtonMotionActive = 'true';
      activeScope.style.setProperty('--site-button-bracket-x', bracketX);
      activeScope.style.setProperty('--site-button-bracket-y', bracketY);
    }
  };

  const handlePointerMove = (event) => {
    const button = getButton(event.target);

    if (button) {
      syncButtonMotion(button, event);
      return;
    }

    clearButtonMotion();
  };

  const handlePointerOut = (event) => {
    if (event.relatedTarget === null) {
      clearButtonMotion();
    }
  };

  const enableButtons = () => {
    if (isEnabled) {
      return;
    }

    isEnabled = true;
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('blur', clearButtonMotion);
    document.addEventListener('visibilitychange', clearButtonMotion);
  };

  const disableButtons = () => {
    if (!isEnabled) {
      return;
    }

    isEnabled = false;
    clearButtonMotion();
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerout', handlePointerOut);
    window.removeEventListener('blur', clearButtonMotion);
    document.removeEventListener('visibilitychange', clearButtonMotion);
  };

  const syncButtons = () => {
    if (buttonViewport.matches) {
      enableButtons();
      return;
    }

    disableButtons();
  };

  buttonViewport.addEventListener('change', syncButtons);
  syncButtons();
}
