// Punto de entrada: coordina módulos, no contiene lógica de secciones.
import { initNavigation } from "./components/navigation.js";
import { whenNearViewport } from "./utils/lazy-section.js";
import { initTheme } from "./components/theme.js";

initTheme();
initNavigation();

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

whenNearViewport("#proyectos", async (section) => {
  const { initProjects } = await import("./sections/projects.js");
  initProjects(section);
  // Mejora opcional: si GSAP falla, summary mantiene su apertura nativa.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    try {
      const { initProjectDetails } = await import(
        "./animations/project-details.js"
      );
      initProjectDetails(section);
    } catch (error) {
      console.warn("Los detalles conservan su comportamiento nativo.", error);
    }
  }
});

// Las animaciones son opcionales y nunca bloquean el contenido.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const loadMotion = async () => {
    try {
      const { initAnimations } = await import("./animations/index.js");
      initAnimations();
    } catch (error) {
      console.warn(
        "No se cargaron las animaciones. El contenido sigue disponible.",
        error,
      );
    }
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadMotion, { timeout: 1800 });
  } else {
    window.setTimeout(loadMotion, 300);
  }
}
