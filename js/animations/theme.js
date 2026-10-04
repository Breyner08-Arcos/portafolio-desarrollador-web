import { gsap } from "gsap";

// Solo anima el control: CSS es la fuente de verdad de todos los colores.
export function animateThemeToggle(button, theme) {
  const context = gsap.context(() => {
    gsap.fromTo(
      ".theme-toggle-icon",
      {
        rotation: theme === "dark" ? -55 : 55,
        scale: 0.75,
      },
      {
        rotation: 0,
        scale: 1,
        duration: 0.55,
        ease: "back.out(1.6)",
        clearProps: "transform",
      },
    );
    gsap.fromTo(
      ".theme-toggle-label",
      { y: 4 },
      {
        y: 0,
        duration: 0.3,
        clearProps: "transform",
      },
    );
  }, button);
  return () => context.revert();
}
