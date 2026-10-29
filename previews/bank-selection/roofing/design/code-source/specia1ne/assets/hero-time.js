const timeNodes = document.querySelectorAll('[data-hero-time]');

const createUkraineFormatter = () => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  for (const timeZone of ['Europe/Kyiv', 'Europe/Kiev']) {
    try {
      return new Intl.DateTimeFormat('en-GB', { ...options, timeZone });
    } catch {
      // Try the legacy spelling for older Safari/ICU builds.
    }
  }

  return new Intl.DateTimeFormat('en-GB', options);
};

if (timeNodes.length) {
  const formatter = createUkraineFormatter();

  const tick = () => {
    const value = `${formatter.format(new Date())} Lviv`;
    timeNodes.forEach((node) => {
      node.textContent = value;
      if (node instanceof HTMLTimeElement) {
        node.dateTime = value.slice(0, 5);
      }
    });
  };

  tick();
  window.setInterval(tick, 15000);
}
