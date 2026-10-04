export function observeReveals(gsap) {
  if (!("IntersectionObserver" in window)) return () => {};
  const tweens = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        // Solo transform: el contenido siempre es visible, incluso si JS se interrumpe.
        const tween = gsap.from(entry.target, {
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "transform",
          onComplete: () => tweens.delete(tween),
        });
        tweens.add(tween);
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll("[data-reveal]")
    .forEach((element) => observer.observe(element));
  return () => {
    observer.disconnect();
    tweens.forEach((tween) => {
      tween.revert();
    });
    tweens.clear();
  };
}
