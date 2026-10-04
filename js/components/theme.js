const STORAGE_KEY = "portfolio-theme";

export function initTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;
  const root = document.documentElement;
  const label = button.querySelector("[data-theme-label]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let revision = 0;
  let motion;
  let stopAnimation;

  function apply(theme) {
    revision += 1;
    stopAnimation?.();
    const dark = theme === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    button.setAttribute("aria-checked", String(dark));
    button.title = dark ? "Activar modo claro" : "Activar modo oscuro";
    label.textContent = dark ? "Modo oscuro" : "Modo claro";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        getComputedStyle(root).getPropertyValue("--color-bg").trim(),
      );
  }

  apply(root.dataset.theme === "light" ? "light" : "dark");
  button.hidden = false;

  button.addEventListener("click", async () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Persistencia opcional. */
    }
    if (reducedMotion.matches) return;
    const currentRevision = revision;
    try {
      motion ??= import("../animations/theme.js");
      const { animateThemeToggle } = await motion;
      // Un clic posterior o un cambio de preferencia invalida la animación pendiente.
      if (currentRevision !== revision || reducedMotion.matches) return;
      stopAnimation = animateThemeToggle(button, theme);
    } catch {
      motion = undefined; // Permite reintentar sin impedir el cambio de tema.
    }
  });

  reducedMotion.addEventListener("change", () => {
    revision += 1;
    stopAnimation?.();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    if (
      event.newValue === null ||
      event.newValue === "dark" ||
      event.newValue === "light"
    ) {
      apply(event.newValue === "light" ? "light" : "dark");
    }
  });
}
