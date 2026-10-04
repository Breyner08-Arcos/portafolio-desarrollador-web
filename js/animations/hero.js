export function animateHero(gsap) {
  // Evita animar la cabecera si la página se abrió en una sección inferior.
  if (window.scrollY > 100) return;
  gsap.from(".hero-animate", {
    y: 18,
    duration: 0.75,
    stagger: 0.08,
    ease: "power2.out",
    clearProps: "transform",
  });
  gsap.from(".hero-art", {
    y: 24,
    duration: 1.1,
    ease: "power2.out",
    clearProps: "transform",
  });
}
