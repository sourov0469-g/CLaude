(() => {
  const overlay = document.querySelector('[data-site-overlay]');

  if (!(overlay instanceof HTMLElement)) {
    return;
  }

  const panels = new Map(
    Array.from(overlay.querySelectorAll('[data-overlay-panel]'))
      .filter((panel) => panel instanceof HTMLElement)
      .map((panel) => [panel.dataset.overlayPanel, panel])
  );
  const menuButtons = Array.from(document.querySelectorAll('button[data-overlay-open="menu"]')).filter(
    (button) => button instanceof HTMLElement
  );
  const overlayControls = overlay.querySelectorAll('[data-overlay-control]');
  const headerControlShells = Array.from(document.querySelectorAll('[data-site-header-control]')).filter(
    (control) => control instanceof HTMLElement
  );
  const headerControlButtons = Array.from(
    document.querySelectorAll('[data-site-header-control-button]')
  ).filter((button) => button instanceof HTMLElement);
  const overlayOpenTriggers = Array.from(document.querySelectorAll('[data-overlay-open]')).filter(
    (trigger) => trigger instanceof HTMLElement
  );
  const overlayMenu = overlay.querySelector('[data-overlay-menu]');
  const overlayMenuLinks =
    overlayMenu instanceof HTMLElement
      ? Array.from(overlayMenu.querySelectorAll('[data-overlay-menu-item]')).filter(
          (link) => link instanceof HTMLElement
        )
      : [];
  const overlayMenuLavalamp =
    overlayMenu instanceof HTMLElement
      ? overlayMenu.querySelector('[data-overlay-menu-lavalamp]')
      : null;
  const overlayMenuLavalampText =
    overlayMenu instanceof HTMLElement
      ? overlayMenu.querySelector('[data-overlay-menu-lavalamp-text]')
      : null;
  const overlayScrollbar = overlay.querySelector('[data-overlay-scrollbar]');
  const overlayScrollbarTrack = overlay.querySelector('[data-overlay-scrollbar-track]');
  const overlayScrollbarThumb = overlay.querySelector('[data-overlay-scrollbar-thumb]');
  const overlayScrollbarEntry =
    overlayScrollbar instanceof HTMLElement &&
    overlayScrollbarTrack instanceof HTMLElement &&
    overlayScrollbarThumb instanceof HTMLElement
      ? {
          scrollbar: overlayScrollbar,
          track: overlayScrollbarTrack,
          thumb: overlayScrollbarThumb,
        }
      : null;
  const desktopTopViewport = window.matchMedia('(min-width: 64rem) and (hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const panelFocusDelay = 160;
  const overlayCloseDelay = 640;
  const reducedOverlayCloseDelay = 240;
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  let activeKind = '';
  let previousFocus = null;
  let activeTrigger = null;
  let closeTimer = 0;
  let openFrame = 0;
  let panelFocusTimer = 0;
  let prewarmFrame = 0;
  let viewportSyncFrame = 0;
  let overlayScrollbarFrame = 0;
  let menuLavalampFrame = 0;
  let menuSectionFrame = 0;
  let menuSectionPendingInstant = false;
  let menuLavalampPendingInstant = false;
  let activeMenuCueLink = null;
  let renderedMenuCueLink = null;
  let menuSectionEntries = [];
  let overlayMenuInitialized = false;
  let overlayScrollbarInitialized = false;
  let revealLockedForOverlay = false;
  let pendingScrollTarget = '';
  let prewarmedOverlayKey = '';
  let prewarmedDrawerKey = '';
  const overlayScrollbarDrag = {
    active: false,
    panel: null,
    startY: 0,
    startScroll: 0,
    maxScroll: 0,
    trackHeight: 0,
    thumbHeight: 0,
  };

  const getPanel = (kind) => panels.get(kind);
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const canUseOverlayScrollbar = () => desktopTopViewport.matches;
  const canUseMenuLavalamp = () => desktopTopViewport.matches && !reducedMotion.matches;
  const isTopHeroMode = () => desktopTopViewport.matches && window.scrollY <= 0;
  const prefersDrawerMode = (trigger) =>
    trigger instanceof HTMLElement && trigger.dataset.overlayModePreference === 'drawer';
  const getOverlayMode = (trigger) =>
    reducedMotion.matches || prefersDrawerMode(trigger)
      ? 'drawer'
      : isTopHeroMode()
        ? 'axis'
        : 'drawer';
  const isHeaderAttached = () => document.documentElement.dataset.siteHeaderAttached === 'true';
  const shouldUseHeaderControl = (mode) =>
    mode === 'drawer' && (isHeaderAttached() || menuButtons.includes(activeTrigger));
  const getSamePageHash = (link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return '';
    }

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
      return '';
    }

    return url.hash;
  };
  const getWorkPracticeScrollTarget = (hash) => {
    const scene = document.querySelector('[data-work-practice-motion]');

    if (!(scene instanceof HTMLElement) || scene.dataset.motionEnabled !== 'true') {
      return null;
    }

    if (hash === '#work') {
      return scene;
    }

    if (hash !== '#practice') {
      return null;
    }

    const practiceAnchor = scene.querySelector('[data-work-practice-scroll-anchor="practice"]');

    return practiceAnchor instanceof HTMLElement ? practiceAnchor : null;
  };
  const getOverlayScrollTarget = (target) => {
    if (target === '#work' || target === '#practice') {
      return getWorkPracticeScrollTarget(target) || target;
    }

    return target;
  };
  const isModifiedLinkClick = (event) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
  const shouldUseNativeLinkNavigation = (event, link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return false;
    }

    if (isModifiedLinkClick(event) || link.hasAttribute('download')) {
      return true;
    }

    const target = link.getAttribute('target');

    if (target && target !== '_self') {
      return true;
    }

    const url = new URL(link.href, window.location.href);

    return url.origin !== window.location.origin || url.pathname !== window.location.pathname;
  };
  const toPixels = (value, fallback = 0) => {
    const rawValue = String(value || '').trim();
    const numericValue = Number.parseFloat(rawValue);

    if (!Number.isFinite(numericValue)) {
      return fallback;
    }

    if (rawValue.endsWith('rem')) {
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return numericValue * rootFontSize;
    }

    if (rawValue.endsWith('vw')) {
      return (numericValue / 100) * window.innerWidth;
    }

    return numericValue;
  };

  const getCurrentMenuCueLink = () => {
    return overlayMenuLinks.find((link) => link.dataset.overlayMenuCurrent === 'true') || null;
  };

  const getMenuSectionTarget = (link) => {
    if (!(link instanceof HTMLAnchorElement)) {
      return null;
    }

    const url = new URL(link.href, window.location.href);

    if (
      url.origin !== window.location.origin ||
      url.pathname !== window.location.pathname ||
      !url.hash
    ) {
      return null;
    }

    const id = decodeURIComponent(url.hash.slice(1));
    const motionTarget = getWorkPracticeScrollTarget(url.hash);

    if (motionTarget instanceof HTMLElement) {
      return motionTarget;
    }

    return id ? document.getElementById(id) : null;
  };

  const refreshMenuSectionEntries = () => {
    menuSectionEntries = overlayMenuLinks
      .map((link) => {
        const target = getMenuSectionTarget(link);

        return target instanceof HTMLElement ? { link, target } : null;
      })
      .filter((entry) => entry);
  };

  const clearCurrentMenuSectionLink = () => {
    overlayMenuLinks.forEach((link) => {
      link.removeAttribute('data-overlay-menu-current');
      link.removeAttribute('aria-current');
    });

    if (!getHoveredMenuCueLink() && !getMenuCueLink(document.activeElement)) {
      activeMenuCueLink = null;
      hideMenuLavalamp();
    }
  };

  const getActiveMenuSectionEntry = () => {
    if (!menuSectionEntries.length) {
      return null;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const anchorY = scrollTop + Math.min(viewportHeight * 0.45, 420);
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + viewportHeight >= documentHeight - 2) {
      return menuSectionEntries[menuSectionEntries.length - 1];
    }

    return menuSectionEntries.reduce((activeEntry, entry) => {
      const sectionTop = entry.target.getBoundingClientRect().top + scrollTop;

      return sectionTop <= anchorY + 1 ? entry : activeEntry;
    }, menuSectionEntries[0]);
  };

  const setCurrentMenuSectionLink = (nextLink, { instant = true } = {}) => {
    if (!(nextLink instanceof HTMLElement)) {
      return;
    }

    const previousLink = getCurrentMenuCueLink();
    const currentChanged = previousLink !== nextLink;

    overlayMenuLinks.forEach((link) => {
      const isCurrent = link === nextLink;

      if (isCurrent) {
        link.dataset.overlayMenuCurrent = 'true';
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('data-overlay-menu-current');
        link.removeAttribute('aria-current');
      }
    });

    if (currentChanged && !getHoveredMenuCueLink() && !getMenuCueLink(document.activeElement)) {
      activeMenuCueLink = nextLink;
      scheduleMenuLavalampUpdate({ instant });
    }
  };

  const syncActiveMenuSection = ({ instant = true } = {}) => {
    if (!menuSectionEntries.length) {
      refreshMenuSectionEntries();
    }

    const activeEntry = getActiveMenuSectionEntry();

    if (activeEntry) {
      setCurrentMenuSectionLink(activeEntry.link, { instant });
      return;
    }

    clearCurrentMenuSectionLink();
  };

  const scheduleActiveMenuSectionUpdate = ({ instant = false } = {}) => {
    if (!overlayMenuInitialized) {
      return;
    }

    menuSectionPendingInstant = menuSectionPendingInstant || instant;

    if (menuSectionFrame) {
      return;
    }

    menuSectionFrame = window.requestAnimationFrame(() => {
      const instantUpdate = menuSectionPendingInstant;

      menuSectionFrame = 0;
      menuSectionPendingInstant = false;
      syncActiveMenuSection({ instant: instantUpdate });
    });
  };

  const getMenuCueLink = (target) => {
    const link = target instanceof Element ? target.closest('[data-overlay-menu-item]') : null;

    return link instanceof HTMLElement ? link : null;
  };

  const getHoveredMenuCueLink = () => {
    return overlayMenuLinks.find((link) => link.matches(':hover')) || null;
  };

  const getMenuCueValue = (link) => {
    if (!(link instanceof HTMLElement)) {
      return '';
    }

    const inlineCue = link.querySelector('.site-overlay__menu-cue');

    return (link.dataset.overlayMenuCueValue || inlineCue?.textContent || '').trim();
  };

  const hideMenuLavalamp = () => {
    window.cancelAnimationFrame(menuLavalampFrame);
    menuLavalampFrame = 0;
    menuLavalampPendingInstant = false;
    renderedMenuCueLink = null;

    if (overlayMenu instanceof HTMLElement) {
      overlayMenu.removeAttribute('data-overlay-menu-lavalamp-ready');
      overlayMenu.removeAttribute('data-overlay-menu-lavalamp-instant');
    }
  };

  const updateMenuLavalamp = () => {
    const instant = menuLavalampPendingInstant;

    menuLavalampFrame = 0;
    menuLavalampPendingInstant = false;

    if (
      !(overlayMenu instanceof HTMLElement) ||
      !(overlayMenuLavalamp instanceof HTMLElement) ||
      !(overlayMenuLavalampText instanceof HTMLElement) ||
      !canUseMenuLavalamp() ||
      activeKind !== 'menu' ||
      overlay.dataset.overlayState !== 'open'
    ) {
      hideMenuLavalamp();
      return;
    }

    const targetLink =
      activeMenuCueLink instanceof HTMLElement ? activeMenuCueLink : getCurrentMenuCueLink();
    const inlineCue = targetLink?.querySelector('.site-overlay__menu-cue');

    if (!(targetLink instanceof HTMLElement) || !(inlineCue instanceof HTMLElement)) {
      hideMenuLavalamp();
      return;
    }

    const menuRect = overlayMenu.getBoundingClientRect();
    const cueRect = inlineCue.getBoundingClientRect();

    if (menuRect.width <= 0 || cueRect.width <= 0 || cueRect.height <= 0) {
      hideMenuLavalamp();
      return;
    }

    const targetIndex = overlayMenuLinks.indexOf(targetLink);
    const previousIndex = overlayMenuLinks.indexOf(renderedMenuCueLink);
    const rowDistance =
      previousIndex >= 0 && targetIndex >= 0 ? Math.abs(targetIndex - previousIndex) : 0;
    const duration = instant ? 0 : Math.min(540, 300 + rowDistance * 64);

    overlayMenuLavalampText.textContent = getMenuCueValue(targetLink);
    overlayMenu.style.setProperty('--overlay-menu-lavalamp-x', `${cueRect.left - menuRect.left}px`);
    overlayMenu.style.setProperty('--overlay-menu-lavalamp-y', `${cueRect.top - menuRect.top}px`);
    overlayMenu.style.setProperty('--overlay-menu-lavalamp-duration', `${duration}ms`);

    if (instant) {
      overlayMenu.dataset.overlayMenuLavalampInstant = 'true';
      window.requestAnimationFrame(() => {
        overlayMenu.removeAttribute('data-overlay-menu-lavalamp-instant');
      });
    }

    overlayMenu.dataset.overlayMenuLavalampReady = 'true';
    renderedMenuCueLink = targetLink;
  };

  const scheduleMenuLavalampUpdate = ({ instant = false } = {}) => {
    menuLavalampPendingInstant = menuLavalampPendingInstant || instant;

    if (menuLavalampFrame) {
      return;
    }

    menuLavalampFrame = window.requestAnimationFrame(updateMenuLavalamp);
  };

  const setMenuLavalampTarget = (link, options) => {
    if (!(link instanceof HTMLElement)) {
      return;
    }

    activeMenuCueLink = link;
    scheduleMenuLavalampUpdate(options);
  };

  const resetMenuLavalampTarget = (options) => {
    activeMenuCueLink = getCurrentMenuCueLink();
    scheduleMenuLavalampUpdate(options);
  };

  const resetMenuLavalampTargetIfIdle = () => {
    window.requestAnimationFrame(() => {
      if (!getHoveredMenuCueLink()) {
        resetMenuLavalampTarget();
      }
    });
  };

  const initOverlayMenu = () => {
    if (overlayMenuInitialized || !(overlayMenu instanceof HTMLElement)) {
      return;
    }

    overlayMenuInitialized = true;

    overlayMenuLinks.forEach((link) => {
      link.addEventListener('pointerenter', () => setMenuLavalampTarget(link), {
        passive: true,
      });
      link.addEventListener('pointerleave', resetMenuLavalampTargetIfIdle, {
        passive: true,
      });
    });

    overlayMenu.addEventListener(
      'pointerleave',
      () => resetMenuLavalampTarget(),
      { passive: true }
    );
    overlayMenu.addEventListener('focusin', (event) => {
      const link = getMenuCueLink(event.target);

      if (link) {
        setMenuLavalampTarget(link);
      }
    });
    overlayMenu.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => {
        if (!overlayMenu.contains(document.activeElement)) {
          resetMenuLavalampTarget();
        }
      });
    });

    refreshMenuSectionEntries();
    syncActiveMenuSection({ instant: true });
  };

  const refreshInitializedMenuSectionState = ({ instant = true } = {}) => {
    if (!overlayMenuInitialized) {
      return;
    }

    refreshMenuSectionEntries();
    scheduleActiveMenuSectionUpdate({ instant });
  };

  const getActiveScrollbarPanel = () => {
    if (activeKind) {
      const panel = getPanel(activeKind);

      if (panel instanceof HTMLElement) {
        return panel;
      }
    }

    return Array.from(panels.values()).find((panel) => {
      return panel instanceof HTMLElement && panel.dataset.overlayPanelActive === 'true';
    });
  };

  const getOverlayScrollbarEntry = () => {
    if (!overlayScrollbarEntry) {
      return null;
    }

    const panel = getActiveScrollbarPanel();

    if (!(panel instanceof HTMLElement)) {
      return null;
    }

    return {
      ...overlayScrollbarEntry,
      panel,
    };
  };

  const hideOverlayScrollbar = () => {
    overlayScrollbarEntry?.scrollbar.removeAttribute('data-overlay-scrollbar-visible');
  };

  const resetPanelScroll = (panel) => {
    if (!(panel instanceof HTMLElement)) {
      return;
    }

    panel.scrollTop = 0;
    scheduleOverlayScrollbarUpdate();
  };

  const getPanelScrollbarMetrics = (entry) => {
    if (!entry || !canUseOverlayScrollbar()) {
      return null;
    }

    const { panel, track } = entry;
    const contentHeight = panel.scrollHeight;
    const maxScroll = Math.max(0, contentHeight - panel.clientHeight);
    const trackRect = track.getBoundingClientRect();
    const trackHeight = trackRect.height;

    if (
      maxScroll <= 4 ||
      trackHeight <= 0 ||
      panel.dataset.overlayPanelActive !== 'true' ||
      overlay.dataset.overlayState !== 'open'
    ) {
      return null;
    }

    const thumbHeight = clamp(
      (panel.clientHeight / contentHeight) * trackHeight,
      Math.min(48, trackHeight),
      trackHeight
    );

    return {
      maxScroll,
      thumbHeight,
      trackHeight,
      trackTop: trackRect.top,
    };
  };

  const updatePanelScrollbar = (entry) => {
    if (!entry) {
      hideOverlayScrollbar();
      return;
    }

    const metrics = getPanelScrollbarMetrics(entry);

    if (!metrics) {
      hideOverlayScrollbar();
      return;
    }

    const availableTrack = Math.max(1, metrics.trackHeight - metrics.thumbHeight);
    const progress = clamp(entry.panel.scrollTop / metrics.maxScroll, 0, 1);
    const thumbY = progress * availableTrack;

    entry.scrollbar.style.setProperty('--overlay-scrollbar-thumb-height', `${metrics.thumbHeight}px`);
    entry.scrollbar.style.setProperty('--overlay-scrollbar-thumb-y', `${thumbY}px`);
    entry.scrollbar.dataset.overlayScrollbarVisible = 'true';
  };

  const updateOverlayScrollbars = () => {
    overlayScrollbarFrame = 0;
    updatePanelScrollbar(getOverlayScrollbarEntry());
  };

  const scheduleOverlayScrollbarUpdate = () => {
    if (overlayScrollbarFrame) {
      return;
    }

    overlayScrollbarFrame = window.requestAnimationFrame(updateOverlayScrollbars);
  };

  const stopOverlayScrollbarDrag = () => {
    if (!overlayScrollbarDrag.active) {
      return;
    }

    overlayScrollbarDrag.active = false;
    overlayScrollbarDrag.panel = null;
    document.documentElement.removeAttribute('data-site-overlay-scrollbar-dragging');
    window.removeEventListener('pointermove', handleOverlayScrollbarDrag);
    window.removeEventListener('pointerup', stopOverlayScrollbarDrag);
    window.removeEventListener('pointercancel', stopOverlayScrollbarDrag);
  };

  function handleOverlayScrollbarDrag(event) {
    if (!overlayScrollbarDrag.active || !(overlayScrollbarDrag.panel instanceof HTMLElement)) {
      return;
    }

    event.preventDefault();

    const availableTrack = Math.max(
      1,
      overlayScrollbarDrag.trackHeight - overlayScrollbarDrag.thumbHeight
    );
    const scrollDelta =
      ((event.clientY - overlayScrollbarDrag.startY) / availableTrack) *
      overlayScrollbarDrag.maxScroll;

    overlayScrollbarDrag.panel.scrollTop = overlayScrollbarDrag.startScroll + scrollDelta;
    scheduleOverlayScrollbarUpdate();
  }

  const handleOverlayScrollbarPointerDown = (event) => {
    if (event.button !== 0 || !canUseOverlayScrollbar()) {
      return;
    }

    const track =
      event.target instanceof Element
        ? event.target.closest('[data-overlay-scrollbar-track]')
        : null;

    if (!(track instanceof HTMLElement)) {
      return;
    }

    if (!overlayScrollbarEntry || track !== overlayScrollbarEntry.track) {
      return;
    }

    const entry = getOverlayScrollbarEntry();
    const metrics = getPanelScrollbarMetrics(entry);

    if (!entry || !metrics) {
      return;
    }

    event.preventDefault();

    if (!(event.target instanceof Node) || !entry.thumb.contains(event.target)) {
      const availableTrack = Math.max(1, metrics.trackHeight - metrics.thumbHeight);
      const targetY = event.clientY - metrics.trackTop - metrics.thumbHeight / 2;

      entry.panel.scrollTop = (targetY / availableTrack) * metrics.maxScroll;
      scheduleOverlayScrollbarUpdate();
      return;
    }

    overlayScrollbarDrag.active = true;
    overlayScrollbarDrag.panel = entry.panel;
    overlayScrollbarDrag.startY = event.clientY;
    overlayScrollbarDrag.startScroll = entry.panel.scrollTop;
    overlayScrollbarDrag.maxScroll = metrics.maxScroll;
    overlayScrollbarDrag.trackHeight = metrics.trackHeight;
    overlayScrollbarDrag.thumbHeight = metrics.thumbHeight;
    document.documentElement.dataset.siteOverlayScrollbarDragging = 'true';

    window.addEventListener('pointermove', handleOverlayScrollbarDrag, { passive: false });
    window.addEventListener('pointerup', stopOverlayScrollbarDrag);
    window.addEventListener('pointercancel', stopOverlayScrollbarDrag);
  };

  const initOverlayScrollbar = () => {
    if (overlayScrollbarInitialized || !overlayScrollbarEntry) {
      return;
    }

    overlayScrollbarInitialized = true;
    overlay.addEventListener('pointerdown', handleOverlayScrollbarPointerDown);

    panels.forEach((panel) => {
      panel.addEventListener('scroll', scheduleOverlayScrollbarUpdate, { passive: true });
    });

    if ('MutationObserver' in window) {
      const overlayScrollbarObserver = new MutationObserver(scheduleOverlayScrollbarUpdate);

      panels.forEach((panel) => {
        overlayScrollbarObserver.observe(panel, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['hidden', 'data-field-state', 'data-form-state', 'data-overlay-panel-active'],
        });
      });
    }
  };

  const getTriggerCenterX = (trigger) => {
    if (trigger instanceof Element) {
      const rect = trigger.getBoundingClientRect();
      return rect.left + rect.width / 2;
    }

    return null;
  };

  const getAxisOriginX = (trigger) => {
    return getTriggerCenterX(trigger) ?? window.innerWidth * 0.6;
  };

  const getPanelLeft = () => {
    const panel = getPanel(activeKind);

    if (!(panel instanceof HTMLElement)) {
      return window.innerWidth;
    }

    const inlinePanelLeft = overlay.style.getPropertyValue('--overlay-panel-left');

    if (inlinePanelLeft) {
      return toPixels(inlinePanelLeft, window.innerWidth);
    }

    const panelStyle = getComputedStyle(panel);
    const panelWidth = Math.min(
      window.innerWidth,
      toPixels(panelStyle.getPropertyValue('--overlay-panel-width'), panel.getBoundingClientRect().width)
    );

    return window.innerWidth - panelWidth;
  };

  const isAxisOutsidePanelClick = (event, target) => {
    if (
      !activeKind ||
      overlay.dataset.overlayMode !== 'axis' ||
      !(event instanceof MouseEvent) ||
      target.closest('[data-overlay-open], [data-overlay-close], [data-overlay-control]')
    ) {
      return false;
    }

    return event.clientX < getPanelLeft();
  };

  const clearAxisGeometry = () => {
    overlay.style.removeProperty('--overlay-axis-left');
    overlay.style.removeProperty('--overlay-axis-right');
    overlay.style.removeProperty('--overlay-axis-width');
    overlay.style.removeProperty('--overlay-panel-left');
    prewarmedOverlayKey = '';
  };

  const pinReveal = (centerFraction) => {
    document.dispatchEvent(
      new CustomEvent('site:reveal-pin', { detail: { centerFraction, owner: 'overlay' } })
    );
  };

  const pauseReveal = () => {
    document.dispatchEvent(new CustomEvent('site:reveal-pause', { detail: { owner: 'overlay' } }));
  };

  const resumeReveal = () => {
    document.dispatchEvent(new CustomEvent('site:reveal-resume', { detail: { owner: 'overlay' } }));
  };

  const syncOverlayGeometry = (kind, mode, trigger) => {
    if (mode !== 'axis') {
      clearAxisGeometry();
      return;
    }

    const panel = getPanel(kind);

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const panelStyle = getComputedStyle(panel);
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const panelWidth = Math.min(
      window.innerWidth,
      toPixels(panelStyle.getPropertyValue('--overlay-panel-width'), panel.getBoundingClientRect().width)
    );
    const panelLeft = window.innerWidth - panelWidth;
    const axisWidth = rootFontSize * 7;
    const axisCenter = clamp(
      getAxisOriginX(trigger),
      axisWidth / 2,
      Math.max(window.innerWidth - axisWidth / 2, axisWidth / 2)
    );

    overlay.style.setProperty('--overlay-axis-left', `${axisCenter - axisWidth / 2}px`);
    overlay.style.setProperty('--overlay-axis-right', `${window.innerWidth - axisCenter - axisWidth / 2}px`);
    overlay.style.setProperty('--overlay-axis-width', `${axisWidth}px`);
    overlay.style.setProperty('--overlay-panel-left', `${panelLeft}px`);

    return axisCenter;
  };

  const setMenuControl = (control, isCloseControl, origin = '') => {
    if (!(control instanceof HTMLElement)) {
      return;
    }

    const ariaLabel = isCloseControl ? 'Close overlay' : 'Open menu';

    control.setAttribute('aria-label', ariaLabel);
    control.setAttribute('aria-expanded', String(isCloseControl));
    control.dataset.menuState = isCloseControl ? 'open' : 'closed';

    if (origin) {
      control.dataset.menuOrigin = origin;
      return;
    }

    delete control.dataset.menuOrigin;
  };

  const setOverlayControls = (isCloseControl, origin = '') => {
    overlayControls.forEach((control) => {
      setMenuControl(control, isCloseControl, origin);
    });
  };

  const setHeaderControls = (isCloseControl, origin = '') => {
    headerControlShells.forEach((control) => {
      control.setAttribute('aria-hidden', String(!isCloseControl));

      if ('inert' in control) {
        control.inert = !isCloseControl;
      } else if (isCloseControl) {
        control.removeAttribute('inert');
      } else {
        control.setAttribute('inert', '');
      }
    });

    headerControlButtons.forEach((control) => {
      setMenuControl(control, isCloseControl, origin);
    });
  };

  const setOverlayControlSurface = (surface, origin = '') => {
    if (surface) {
      document.documentElement.dataset.siteOverlayControl = surface;
    } else {
      document.documentElement.removeAttribute('data-site-overlay-control');
    }

    setHeaderControls(surface === 'header', origin);
  };

  const syncOverlayControls = (mode, trigger) => {
    const controlOrigin =
      activeKind === 'menu' ? (mode === 'axis' && menuButtons.includes(trigger) ? 'dot' : 'grid') : '';
    const controlSurface = shouldUseHeaderControl(mode) ? 'header' : 'panel';

    setMenuButtonsExpanded(mode === 'axis' || activeKind === 'menu');
    setOverlayControls(true, controlOrigin);
    setOverlayControlSurface(controlSurface, controlSurface === 'header' ? 'grid' : '');
  };

  const setMenuButtonsExpanded = (isExpanded) => {
    menuButtons.forEach((button) => {
      button.setAttribute('aria-expanded', String(isExpanded));
    });
  };

  const prepareOverlayState = (kind, mode, trigger) => {
    overlay.dataset.overlayKind = kind;
    overlay.dataset.overlayMode = mode;
    const axisCenter = syncOverlayGeometry(kind, mode, trigger);
    overlay.setAttribute('aria-hidden', 'false');

    document.documentElement.dataset.siteOverlayOpen = kind;
    document.documentElement.dataset.siteOverlayMode = mode;
    document.dispatchEvent(new CustomEvent('site:overlay-open', { detail: { kind, mode } }));

    if (mode === 'axis') {
      pinReveal(Number.isFinite(axisCenter) ? axisCenter / window.innerWidth : undefined);
    } else {
      pauseReveal();
    }

    revealLockedForOverlay = true;

    syncOverlayControls(mode, trigger);
  };

  const completeOpenState = () => {
    window.cancelAnimationFrame(openFrame);
    openFrame = 0;
    overlay.dataset.overlayState = 'open';
    delete overlay.dataset.overlayPhase;
    scheduleOverlayScrollbarUpdate();
    resetMenuLavalampTarget({ instant: true });
  };

  const commitOpenState = (mode, panel) => {
    window.cancelAnimationFrame(openFrame);
    openFrame = 0;
    overlay.dataset.overlayPhase = 'opening';

    // Commit the visible closed state as the transition start value, then let it
    // paint before opening. Drawer panels need their own layout read on a cold
    // first open because they are otherwise hidden off-canvas until this moment.
    if (mode === 'drawer' && panel instanceof HTMLElement) {
      void panel.offsetWidth;
    } else {
      void overlay.offsetWidth;
    }

    const openAfterFrame = (remainingFrames) => {
      openFrame = window.requestAnimationFrame(() => {
        if (remainingFrames > 1) {
          openAfterFrame(remainingFrames - 1);
          return;
        }

        completeOpenState();
      });
    };

    openAfterFrame(reducedMotion.matches ? 2 : mode === 'drawer' ? 3 : 2);
  };

  const clearOverlayState = () => {
    delete overlay.dataset.overlayPhase;
    overlay.dataset.overlayState = 'closed';
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.removeAttribute('data-site-overlay-open');
    document.documentElement.dataset.siteOverlayControl = 'panel';
    setHeaderControls(false, 'close');

    if (overlay.dataset.overlayMode === 'axis') {
      setOverlayControls(false, 'close');
    } else {
      setOverlayControls(false);
    }

    setMenuButtonsExpanded(false);
    scheduleOverlayScrollbarUpdate();
    hideMenuLavalamp();
  };

  const shouldKeepClosedOverlayWarm = () =>
    !reducedMotion.matches &&
    overlay.dataset.overlayMode === 'axis' &&
    ['menu', 'contact'].includes(overlay.dataset.overlayKind || '');
  const isOverlayClosing = () => closeTimer !== 0;

  const finalizeClosedState = () => {
    const keepWarm = shouldKeepClosedOverlayWarm();

    if (!keepWarm) {
      overlay.removeAttribute('data-overlay-kind');
      overlay.removeAttribute('data-overlay-mode');
    }

    document.documentElement.removeAttribute('data-site-overlay-mode');
    document.documentElement.removeAttribute('data-site-overlay-control');

    if (revealLockedForOverlay) {
      resumeReveal();
    }

    revealLockedForOverlay = false;
    activeTrigger = null;

    if (!keepWarm) {
      clearAxisGeometry();
    }

    document.dispatchEvent(new CustomEvent('site:overlay-close'));

    if (pendingScrollTarget) {
      document.dispatchEvent(
        new CustomEvent('site:scroll-to', {
          detail: { target: getOverlayScrollTarget(pendingScrollTarget) },
        })
      );
      pendingScrollTarget = '';
    }
  };

  const syncPanels = (kind) => {
    panels.forEach((panel, panelKind) => {
      const isActive = panelKind === kind;

      panel.dataset.overlayPanelActive = String(isActive);
      panel.setAttribute('aria-hidden', String(!isActive));

      if ('inert' in panel) {
        panel.inert = !isActive;
      } else if (isActive) {
        panel.removeAttribute('inert');
      } else {
        panel.setAttribute('inert', '');
      }
    });

    scheduleOverlayScrollbarUpdate();

    if (kind === 'menu') {
      syncActiveMenuSection({ instant: true });
      activeMenuCueLink = getCurrentMenuCueLink();
      scheduleMenuLavalampUpdate({ instant: true });
    } else {
      hideMenuLavalamp();
    }
  };

  const deactivatePanels = () => {
    panels.forEach((panel) => {
      panel.dataset.overlayPanelActive = 'false';
      panel.setAttribute('aria-hidden', 'true');

      if ('inert' in panel) {
        panel.inert = true;
      } else {
        panel.setAttribute('inert', '');
      }
    });

    scheduleOverlayScrollbarUpdate();
    hideMenuLavalamp();
  };

  const completeClosedState = () => {
    window.clearTimeout(closeTimer);
    closeTimer = 0;

    const keepWarm = shouldKeepClosedOverlayWarm();

    finalizeClosedState();

    if (keepWarm) {
      lockPanelsForClosedState();
    } else {
      deactivatePanels();
    }
  };

  const lockPanelAccessibility = (panel) => {
    panel.setAttribute('aria-hidden', 'true');

    if ('inert' in panel) {
      panel.inert = true;
    } else {
      panel.setAttribute('inert', '');
    }
  };

  const lockPanelsForClosedState = () => {
    panels.forEach((panel) => {
      lockPanelAccessibility(panel);
    });
  };

  const prewarmClosedPanel = (kind) => {
    panels.forEach((panel, panelKind) => {
      panel.dataset.overlayPanelActive = String(panelKind === kind);
      lockPanelAccessibility(panel);
    });
  };

  const isVisibleFocusable = (element) => {
    return (
      element instanceof HTMLElement &&
      element.getClientRects().length > 0 &&
      getComputedStyle(element).visibility !== 'hidden'
    );
  };

  const uniqueFocusables = (elements) => {
    return elements.filter((element, index, list) => {
      return element instanceof HTMLElement && list.indexOf(element) === index;
    });
  };

  const getPrimaryPanelFocus = (panel) => {
    const primaryPanelFocus = panel.querySelector('[data-overlay-primary-focus]');

    if (isVisibleFocusable(primaryPanelFocus)) {
      return primaryPanelFocus;
    }

    return null;
  };

  const isHeaderControlSurface = () =>
    document.documentElement.dataset.siteOverlayControl === 'header';

  const getActiveHeaderFocusables = () =>
    isHeaderControlSurface() ? headerControlButtons.filter(isVisibleFocusable) : [];

  const getPanelFocusables = (panel) =>
    uniqueFocusables([
      getPrimaryPanelFocus(panel),
      ...getActiveHeaderFocusables(),
      ...Array.from(panel.querySelectorAll(focusableSelector)).filter(isVisibleFocusable),
    ]);

  const getFirstFocusable = (panel) => {
    const first = getPanelFocusables(panel)[0];
    return first instanceof HTMLElement ? first : panel;
  };

  const cancelPanelFocus = () => {
    window.clearTimeout(panelFocusTimer);
    panelFocusTimer = 0;
  };

  const focusPanel = (kind) => {
    const panel = getPanel(kind);

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    cancelPanelFocus();

    panelFocusTimer = window.setTimeout(() => {
      panelFocusTimer = 0;
      getFirstFocusable(panel).focus({ preventScroll: true });
    }, panelFocusDelay);
  };

  const clearContactValidation = () => {
    document.dispatchEvent(new CustomEvent('site:contact-validation-reset'));
  };

  const cancelOverlayPrewarm = () => {
    window.cancelAnimationFrame(prewarmFrame);
    prewarmFrame = 0;
  };

  const prewarmOverlay = (kind, trigger) => {
    if (
      reducedMotion.matches ||
      activeKind ||
      isOverlayClosing() ||
      overlay.dataset.overlayState === 'open' ||
      overlay.dataset.overlayPhase === 'opening'
    ) {
      return;
    }

    const panel = getPanel(kind);

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const mode = getOverlayMode(trigger);
    const prewarmKey =
      mode === 'axis'
        ? `${kind}:${Math.round(getAxisOriginX(trigger))}:${window.innerWidth}`
        : `${kind}:drawer:${window.innerWidth}`;

    if (mode === 'axis' && prewarmedOverlayKey === prewarmKey) {
      return;
    }

    if (mode === 'drawer' && prewarmedDrawerKey === prewarmKey) {
      return;
    }

    // Keep this visual-only: no root open attrs, no scroll lock, no focus.
    overlay.dataset.overlayKind = kind;
    overlay.dataset.overlayMode = mode;
    overlay.dataset.overlayState = 'closed';
    overlay.setAttribute('aria-hidden', 'true');

    if (mode === 'axis') {
      delete overlay.dataset.overlayPhase;
      syncOverlayGeometry(kind, 'axis', trigger);
    } else {
      overlay.dataset.overlayPhase = 'prewarm';
      clearAxisGeometry();
    }

    prewarmClosedPanel(kind);

    void panel.offsetWidth;

    if (mode === 'axis') {
      prewarmedOverlayKey = prewarmKey;
    } else {
      prewarmedDrawerKey = prewarmKey;
    }
  };

  const scheduleOverlayPrewarm = (trigger) => {
    if (
      !(trigger instanceof HTMLElement) ||
      reducedMotion.matches ||
      activeKind ||
      isOverlayClosing()
    ) {
      return;
    }

    const kind = trigger.dataset.overlayOpen || '';

    if (!kind || !(getPanel(kind) instanceof HTMLElement)) {
      return;
    }

    cancelOverlayPrewarm();
    prewarmFrame = window.requestAnimationFrame(() => {
      prewarmFrame = 0;
      prewarmOverlay(kind, trigger);
    });
  };

  const openOverlay = (kind, trigger, { moveFocus = true } = {}) => {
    const panel = getPanel(kind);

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    cancelOverlayPrewarm();
    cancelPanelFocus();
    window.clearTimeout(closeTimer);
    closeTimer = 0;

    if (
      activeKind === kind &&
      (overlay.dataset.overlayState === 'open' || overlay.dataset.overlayPhase === 'opening')
    ) {
      closeOverlay();
      return;
    }

    const previousKind = activeKind;

    if (!previousKind) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }

    if (previousKind === 'contact' && kind !== 'contact') {
      clearContactValidation();
    }

    activeKind = kind;
    activeTrigger = trigger instanceof Element ? trigger : null;
    initOverlayScrollbar();

    if (kind === 'contact') {
      clearContactValidation();
    }

    if (kind === 'menu') {
      initOverlayMenu();
      refreshMenuSectionEntries();
      syncActiveMenuSection({ instant: true });
    }

    activeMenuCueLink = kind === 'menu' ? getCurrentMenuCueLink() : null;

    const mode = getOverlayMode(activeTrigger);

    syncPanels(kind);
    resetPanelScroll(panel);
    prepareOverlayState(kind, mode, activeTrigger);
    commitOpenState(mode, panel);
    scheduleOverlayScrollbarUpdate();
    scheduleMenuLavalampUpdate({ instant: true });

    if (moveFocus) {
      focusPanel(kind);
    }
  };

  const syncOpenOverlayToViewport = () => {
    viewportSyncFrame = 0;

    if (!activeKind || overlay.dataset.overlayState !== 'open') {
      return;
    }

    const currentMode = overlay.dataset.overlayMode;

    if (currentMode === 'axis') {
      if (getOverlayMode(activeTrigger) === 'axis') {
        const axisCenter = syncOverlayGeometry(activeKind, 'axis', activeTrigger);

        if (Number.isFinite(axisCenter)) {
          pinReveal(axisCenter / window.innerWidth);
          revealLockedForOverlay = true;
        }

        scheduleMenuLavalampUpdate({ instant: true });
        return;
      }

      overlay.dataset.overlayMode = 'drawer';
      document.documentElement.dataset.siteOverlayMode = 'drawer';
      clearAxisGeometry();
      syncOverlayControls('drawer', activeTrigger);
      pauseReveal();
      revealLockedForOverlay = true;
      scheduleMenuLavalampUpdate({ instant: true });
      return;
    }

    if (currentMode === 'drawer') {
      syncOverlayControls('drawer', activeTrigger);
      pauseReveal();
      revealLockedForOverlay = true;
      scheduleMenuLavalampUpdate({ instant: true });
    }
  };

  const scheduleViewportSync = () => {
    if (viewportSyncFrame) {
      return;
    }

    viewportSyncFrame = window.requestAnimationFrame(syncOpenOverlayToViewport);
  };

  function closeOverlay({ restoreFocus = true } = {}) {
    if (!activeKind) {
      return;
    }

    const focusTarget = previousFocus;
    const closingKind = activeKind;

    activeKind = '';
    cancelPanelFocus();
    cancelOverlayPrewarm();
    window.cancelAnimationFrame(viewportSyncFrame);
    viewportSyncFrame = 0;
    stopOverlayScrollbarDrag();
    window.cancelAnimationFrame(openFrame);
    openFrame = 0;
    clearOverlayState();

    if (closingKind === 'contact') {
      clearContactValidation();
    }

    closeTimer = window.setTimeout(
      completeClosedState,
      reducedMotion.matches ? reducedOverlayCloseDelay : overlayCloseDelay
    );

    if (restoreFocus && focusTarget instanceof HTMLElement) {
      focusTarget.focus({ preventScroll: true });
    }
  }

  const handleDocumentClick = (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const opener = target.closest('[data-overlay-open]');

    if (opener instanceof HTMLElement) {
      event.preventDefault();

      if (
        menuButtons.includes(opener) &&
        activeKind &&
        overlay.dataset.overlayMode === 'axis'
      ) {
        closeOverlay({ restoreFocus: event.detail === 0 });
        return;
      }

      openOverlay(opener.dataset.overlayOpen || '', opener, { moveFocus: event.detail === 0 });
      return;
    }

    const closer = target.closest('[data-overlay-close]');

    if (closer instanceof HTMLElement) {
      const link = closer instanceof HTMLAnchorElement ? closer : closer.closest('a[href]');

      if (shouldUseNativeLinkNavigation(event, link)) {
        closeOverlay({ restoreFocus: false });
        return;
      }

      event.preventDefault();
      pendingScrollTarget = getSamePageHash(link instanceof HTMLAnchorElement ? link : closer);
      closeOverlay({ restoreFocus: event.detail === 0 && !pendingScrollTarget });
      return;
    }

    if (isAxisOutsidePanelClick(event, target)) {
      event.preventDefault();
      closeOverlay({ restoreFocus: false });
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeOverlay();
      return;
    }

    if (event.key !== 'Tab' || !activeKind) {
      return;
    }

    const panel = getPanel(activeKind);

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const focusable = getPanelFocusables(panel);

    if (!focusable.length) {
      event.preventDefault();
      panel.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;

    if (!focusable.includes(activeElement)) {
      event.preventDefault();
      first.focus({ preventScroll: true });
      return;
    }

    if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
      return;
    }

    if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  };

  const handleReducedMotionChange = () => {
    cancelOverlayPrewarm();

    if (reducedMotion.matches) {
      hideMenuLavalamp();

      if (
        !activeKind &&
        overlay.dataset.overlayState === 'closed' &&
        (overlay.dataset.overlayPhase === 'prewarm' || overlay.dataset.overlayMode === 'axis')
      ) {
        delete overlay.dataset.overlayPhase;
        overlay.removeAttribute('data-overlay-kind');
        overlay.removeAttribute('data-overlay-mode');
        clearAxisGeometry();
        deactivatePanels();
      }
    }

    window.cancelAnimationFrame(viewportSyncFrame);
    viewportSyncFrame = 0;
    syncOpenOverlayToViewport();
    scheduleOverlayScrollbarUpdate();
    refreshInitializedMenuSectionState({ instant: true });
    scheduleMenuLavalampUpdate({ instant: true });
  };

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('site:header-attachment-change', scheduleViewportSync);
  document.addEventListener('site:work-practice-motion-refresh', () =>
    refreshInitializedMenuSectionState({ instant: true })
  );
  overlayOpenTriggers.forEach((trigger) => {
    trigger.addEventListener('pointerenter', () => scheduleOverlayPrewarm(trigger), {
      passive: true,
    });
    trigger.addEventListener('focus', () => scheduleOverlayPrewarm(trigger));
  });

  window.addEventListener('resize', scheduleViewportSync, { passive: true });
  window.addEventListener('resize', scheduleOverlayScrollbarUpdate, { passive: true });
  window.addEventListener(
    'resize',
    () => refreshInitializedMenuSectionState({ instant: true }),
    { passive: true }
  );
  window.addEventListener('resize', () => scheduleMenuLavalampUpdate({ instant: true }), {
    passive: true,
  });
  window.addEventListener('orientationchange', scheduleViewportSync);
  window.addEventListener('orientationchange', scheduleOverlayScrollbarUpdate);
  window.addEventListener('orientationchange', () =>
    refreshInitializedMenuSectionState({ instant: true })
  );
  window.addEventListener('orientationchange', () => scheduleMenuLavalampUpdate({ instant: true }));
  desktopTopViewport.addEventListener('change', scheduleViewportSync);
  desktopTopViewport.addEventListener('change', scheduleOverlayScrollbarUpdate);
  desktopTopViewport.addEventListener('change', () =>
    refreshInitializedMenuSectionState({ instant: true })
  );
  desktopTopViewport.addEventListener('change', () => scheduleMenuLavalampUpdate({ instant: true }));
  reducedMotion.addEventListener('change', handleReducedMotionChange);

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleViewportSync, { passive: true });
    window.visualViewport.addEventListener('resize', scheduleOverlayScrollbarUpdate, {
      passive: true,
    });
    window.visualViewport.addEventListener(
      'resize',
      () => refreshInitializedMenuSectionState({ instant: true }),
      { passive: true }
    );
    window.visualViewport.addEventListener(
      'resize',
      () => scheduleMenuLavalampUpdate({ instant: true }),
      { passive: true }
    );
  }

  if (document.fonts) {
    document.fonts.ready.then(() => {
      refreshInitializedMenuSectionState({ instant: true });
      scheduleMenuLavalampUpdate({ instant: true });
    });
  }
})();
