// Cada sección descarga su lógica una sola vez al acercarse al viewport.
export function whenNearViewport(selector, initialize) {
  const section = document.querySelector(selector);
  if (!section) return;

  const load = () =>
    Promise.resolve()
      .then(() => initialize(section))
      .catch((error) => {
        console.warn(
          `No se pudo mejorar la sección ${selector}. Su HTML sigue disponible.`,
          error,
        );
      });

  if (!("IntersectionObserver" in window)) {
    load();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    },
    { rootMargin: "250px 0px" },
  );
  observer.observe(section);
}
