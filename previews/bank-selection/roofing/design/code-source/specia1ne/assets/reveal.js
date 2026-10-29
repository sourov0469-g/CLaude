const shell = document.querySelector('[data-reveal-shell]');
const revealViewport = window.matchMedia(
  '(min-width: 64rem) and (hover: hover) and (pointer: fine)'
);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (shell instanceof HTMLElement) {
  const initialPosition = 0.6;
  const bandWidthRem = 7;
  const inactiveDelay = 680;
  const settleThreshold = 0.001;
  const interpolation = 0.12;

  let currentPosition = initialPosition;
  let targetPosition = initialPosition;
  let animationFrame = 0;
  let inactivityTimer = 0;
  let isEnabled = false;
  const lockOwners = new Set();
  let lastClientX = null;
  let lastClientY = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const isRevealLocked = () => lockOwners.size > 0;
  const getLockOwner = (event) => event.detail?.owner || 'default';
  const addLock = (owner) => {
    const wasLocked = isRevealLocked();

    lockOwners.add(owner);

    return wasLocked;
  };
  const removeLock = (owner) => {
    const wasLocked = isRevealLocked();

    lockOwners.delete(owner);

    return wasLocked && !isRevealLocked();
  };

  const getRevealAnchor = (target) => {
    if (!(target instanceof Element)) {
      return null;
    }

    const revealAnchor = target.closest('[data-reveal-anchor]');

    if (
      revealAnchor instanceof Element &&
      !revealAnchor.matches(':disabled, [aria-disabled="true"]')
    ) {
      return revealAnchor;
    }

    return null;
  };

  const getSafePosition = (clientX) => {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    const halfBand = (bandWidthRem * rootFontSize) / 2;
    const viewportWidth = window.innerWidth;
    const minimum = halfBand / viewportWidth;
    const maximum = 1 - minimum;

    return clamp(clientX / viewportWidth, minimum, maximum);
  };

  const getSafeFraction = (position) => getSafePosition(position * window.innerWidth);

  const getAnchorPosition = (anchor) => {
    const rect = anchor.getBoundingClientRect();

    return getSafePosition(rect.left + rect.width / 2);
  };

  const getLastViewportPoint = () => {
    if (lastClientX === null || lastClientY === null) {
      return null;
    }

    return {
      x: clamp(lastClientX, 0, Math.max(window.innerWidth - 1, 0)),
      y: clamp(lastClientY, 0, Math.max(window.innerHeight - 1, 0)),
    };
  };

  const writePosition = () => {
    shell.style.setProperty('--reveal-position', `${currentPosition * 100}%`);
  };

  const clearInactivityTimer = () => {
    window.clearTimeout(inactivityTimer);
    inactivityTimer = 0;
  };

  const stopAnimation = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
  };

  const animate = () => {
    currentPosition += (targetPosition - currentPosition) * interpolation;
    writePosition();

    if (Math.abs(targetPosition - currentPosition) > settleThreshold) {
      animationFrame = requestAnimationFrame(animate);
      return;
    }

    currentPosition = targetPosition;
    writePosition();
    animationFrame = 0;
  };

  const startAnimation = () => {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animate);
    }
  };

  const collapseReveal = () => {
    shell.dataset.revealActive = 'false';
  };

  const clearRevealAnchor = () => {
    delete shell.dataset.revealAnchorActive;
  };

  const syncRevealAnchor = (anchor) => {
    if (!(anchor instanceof HTMLElement)) {
      clearRevealAnchor();
      return;
    }

    shell.dataset.revealAnchorActive = anchor.dataset.revealAnchorName || 'true';
  };

  const holdLastPosition = () => {
    clearInactivityTimer();
    clearRevealAnchor();
    collapseReveal();
    startAnimation();
  };

  const scheduleCollapse = () => {
    clearInactivityTimer();
    inactivityTimer = window.setTimeout(collapseReveal, inactiveDelay);
  };

  // Overlay opening: freeze the band on the trigger axis and keep it active (7rem)
  // so it sits pixel-aligned underneath the overlay band. While pinned, pointer
  // movement is only recorded (lastClient), never applied.
  const pin = (centerFraction) => {
    clearInactivityTimer();
    stopAnimation();
    clearRevealAnchor();

    if (Number.isFinite(centerFraction)) {
      currentPosition = targetPosition = centerFraction;
    }

    shell.dataset.revealInstant = 'true';
    shell.dataset.revealActive = 'true';
    writePosition();

    requestAnimationFrame(() => {
      delete shell.dataset.revealInstant;
    });
  };

  const pause = () => {
    clearInactivityTimer();
    stopAnimation();
    clearRevealAnchor();
    collapseReveal();
    currentPosition = targetPosition;
    writePosition();
  };

  const syncExternalPosition = ({ active, centerFraction } = {}) => {
    if (Number.isFinite(centerFraction)) {
      stopAnimation();
      currentPosition = targetPosition = getSafeFraction(centerFraction);
      writePosition();
    }

    clearRevealAnchor();

    if (active === true) {
      shell.dataset.revealActive = 'true';
      return;
    }

    if (active === false) {
      collapseReveal();
    }
  };

  // Overlay fully closed: take the band back and reconcile with the real pointer
  // position now (hit-test, since a stationary cursor fires no pointer event once
  // the overlay is gone). The band is already 7rem at the axis, so there is no
  // width jump — only a smooth correction toward anchor / free pointer / collapse.
  const resume = () => {
    const lastPoint = getLastViewportPoint();
    const target = lastPoint === null ? null : document.elementFromPoint(lastPoint.x, lastPoint.y);
    const anchor = getRevealAnchor(target);

    if (anchor) {
      clearInactivityTimer();
      targetPosition = getAnchorPosition(anchor);
      shell.dataset.revealActive = 'true';
      syncRevealAnchor(anchor);
      startAnimation();
      return;
    }

    if (target) {
      targetPosition = getSafePosition(lastPoint.x);
      clearRevealAnchor();
      shell.dataset.revealActive = 'true';
      startAnimation();
      scheduleCollapse();
      return;
    }

    holdLastPosition();
  };

  const handlePointerMove = (event) => {
    lastClientX = event.clientX;
    lastClientY = event.clientY;

    if (isRevealLocked()) {
      return;
    }

    const revealAnchor = getRevealAnchor(event.target);

    targetPosition = revealAnchor
      ? getAnchorPosition(revealAnchor)
      : getSafePosition(event.clientX);
    shell.dataset.revealActive = 'true';
    startAnimation();

    if (revealAnchor) {
      syncRevealAnchor(revealAnchor);
      clearInactivityTimer();
      return;
    }

    clearRevealAnchor();
    scheduleCollapse();
  };

  const handleVisibilityChange = () => {
    if (!document.hidden || isRevealLocked()) {
      return;
    }

    clearInactivityTimer();
    stopAnimation();
    clearRevealAnchor();
    collapseReveal();
    currentPosition = targetPosition;
    writePosition();
  };

  const handlePointerOut = (event) => {
    if (isRevealLocked()) {
      return;
    }

    if (event.relatedTarget === null) {
      holdLastPosition();
    }
  };

  const handleBlur = () => {
    if (isRevealLocked()) {
      return;
    }

    holdLastPosition();
  };

  const handleRevealPin = (event) => {
    const owner = getLockOwner(event);

    addLock(owner);

    if (!isEnabled) {
      return;
    }

    pin(event.detail?.centerFraction);
  };

  const handleRevealPause = (event) => {
    const owner = getLockOwner(event);
    const wasLocked = addLock(owner);

    if (!isEnabled) {
      return;
    }

    if (wasLocked) {
      return;
    }

    pause();
  };

  const handleRevealResume = (event) => {
    const owner = getLockOwner(event);
    const shouldResume = removeLock(owner);

    if (!isEnabled) {
      return;
    }

    if (!shouldResume) {
      return;
    }

    resume();
  };

  const handleRevealSync = (event) => {
    if (!isEnabled) {
      return;
    }

    syncExternalPosition(event.detail);
  };

  const enableReveal = () => {
    if (isEnabled) {
      return;
    }

    isEnabled = true;
    shell.dataset.revealEnabled = 'true';
    currentPosition = targetPosition;
    writePosition();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.addEventListener('site:reveal-pin', handleRevealPin);
    document.addEventListener('site:reveal-pause', handleRevealPause);
    document.addEventListener('site:reveal-resume', handleRevealResume);
    document.addEventListener('site:reveal-sync', handleRevealSync);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  };

  const disableReveal = () => {
    if (!isEnabled) {
      return;
    }

    isEnabled = false;
    lockOwners.clear();
    clearInactivityTimer();
    stopAnimation();
    clearRevealAnchor();
    collapseReveal();
    currentPosition = initialPosition;
    targetPosition = initialPosition;
    shell.style.removeProperty('--reveal-position');
    delete shell.dataset.revealEnabled;
    delete shell.dataset.revealInstant;

    window.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerout', handlePointerOut);
    document.removeEventListener('site:reveal-pin', handleRevealPin);
    document.removeEventListener('site:reveal-pause', handleRevealPause);
    document.removeEventListener('site:reveal-resume', handleRevealResume);
    document.removeEventListener('site:reveal-sync', handleRevealSync);
    window.removeEventListener('blur', handleBlur);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };

  const syncReveal = () => {
    if (revealViewport.matches && !reducedMotion.matches) {
      enableReveal();
      return;
    }

    disableReveal();
  };

  revealViewport.addEventListener('change', syncReveal);
  reducedMotion.addEventListener('change', syncReveal);
  syncReveal();
}
