import Alpine from "@alpinejs/csp";

export function initNavigation() {
  Alpine.data("navigation", () => ({
    open: false,
    ready: false,
    media: null,
    handleResize: null,
    get stateClass() {
      return this.ready ? (this.open ? "is-ready is-open" : "is-ready") : "";
    },
    init() {
      this.ready = true;
      this.media = window.matchMedia("(max-width: 760px)");
      this.handleResize = () => {
        if (
          this.media.matches &&
          this.$el.querySelector("nav").contains(document.activeElement)
        ) {
          this.open = true;
        } else {
          this.open = false;
        }
      };
      this.media.addEventListener("change", this.handleResize);
    },
    toggle() {
      this.open = !this.open;
    },
    escape() {
      if (!this.open) return;
      this.open = false;
      this.$refs.toggle.focus();
    },
    followLink(event) {
      const link = event.target.closest("a");
      if (!link || !this.open) return;
      this.open = false;
      // El foco acompaña la navegación antes de ocultar el enlace móvil.
      const target = document.querySelector(link.hash);
      if (!target) return;
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
    },
    focusOut(event) {
      if (event.relatedTarget && !this.$el.contains(event.relatedTarget))
        this.open = false;
    },
    destroy() {
      this.media?.removeEventListener("change", this.handleResize);
    },
  }));
  Alpine.start();
}
