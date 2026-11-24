// jsdom does not implement media queries used by Taiga UI.
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (media: string): MediaQueryList => ({
    media,
    matches: false,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  });
}
