import { gsap } from "gsap";
import { animateHero } from "./hero.js";
import { observeReveals } from "./reveal.js";
import { initButtonMotion } from "./buttons.js";

export function initAnimations() {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", (context) => {
    animateHero(gsap);
    const cleanup = observeReveals(gsap);
    const cleanupButtons = initButtonMotion(gsap, context);
    // GSAP revierte estilos; el observer también se limpia si cambia la preferencia.
    return () => {
      cleanup();
      cleanupButtons();
    };
  });
}
