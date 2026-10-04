import { gsap } from "gsap";

export function initProjectDetails(section) {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const cleanups = [];
    section.querySelectorAll(".project-details").forEach((details) => {
      const summary = details.querySelector(":scope > summary");
      const content = details.querySelector(":scope > div");
      if (!summary || !content) return;
      let expanded = details.open;
      let tween;

      const clearSize = () => {
        details.style.removeProperty("height");
        details.style.removeProperty("overflow");
      };
      const settle = () => {
        tween?.kill();
        tween = null;
        details.open = expanded;
        content.inert = false;
        clearSize();
      };
      const syncState = () => {
        summary.setAttribute("aria-expanded", String(expanded));
        details.dataset.expanded = String(expanded);
      };
      syncState();

      const onClick = (event) => {
        // No interceptar futuros enlaces dentro del summary.
        if (event.defaultPrevented || event.target.closest("a, button, input"))
          return;
        event.preventDefault();
        const startHeight = details.getBoundingClientRect().height;
        tween?.kill();
        expanded = !expanded;
        syncState();
        details.open = true;
        content.inert = !expanded;
        clearSize();
        const styles = getComputedStyle(details);
        const border =
          parseFloat(styles.borderTopWidth) +
          parseFloat(styles.borderBottomWidth);
        const endHeight = expanded
          ? details.getBoundingClientRect().height
          : summary.getBoundingClientRect().height + border;

        // Altura necesaria para desplazar el contenido inferior sin escalar el texto.
        // Solo se mide al interactuar; no hay lecturas de layout en cada frame.
        gsap.set(details, { height: startHeight, overflow: "hidden" });
        tween = gsap.to(details, {
          height: endHeight,
          duration: expanded ? 0.36 : 0.26,
          ease: "power2.inOut",
          overwrite: "auto",
          onComplete: settle,
        });
      };
      summary.addEventListener("click", onClick);
      const onToggle = () => {
        // Conserva cambios nativos, por ejemplo abrir desde buscar en la página.
        if (!tween && expanded !== details.open) {
          expanded = details.open;
          syncState();
        }
      };
      details.addEventListener("toggle", onToggle);
      // Al cambiar el ancho durante una animación se recupera la altura natural.
      window.addEventListener("resize", settle);
      cleanups.push(() => {
        summary.removeEventListener("click", onClick);
        details.removeEventListener("toggle", onToggle);
        window.removeEventListener("resize", settle);
        settle();
        summary.removeAttribute("aria-expanded");
        delete details.dataset.expanded;
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  });
  return () => media.revert();
}
