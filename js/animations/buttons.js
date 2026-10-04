// GSAP gestiona transformaciones; CSS conserva colores y foco visible.
export function initButtonMotion(gsap, context) {
  const removers = [];
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  context.add("buttonState", (button, icon, active, pressed) => {
    gsap.to(button, {
      y: active && !pressed ? -2 : 0,
      scale: pressed ? 0.97 : 1,
      duration: pressed ? 0.12 : 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (icon)
      gsap.to(icon, {
        x: active ? 3 : 0,
        y: active ? -2 : 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
  });

  document
    .querySelectorAll(".button, .nav-contact, .filter-button, .text-link")
    .forEach((button) => {
      const icon = button.querySelector('[aria-hidden="true"]');
      let hovered = false;
      let focused = false;
      let pressed = false;
      const render = () =>
        context.buttonState(button, icon, hovered || focused, pressed);
      const listen = (event, callback) => {
        button.addEventListener(event, callback);
        removers.push(() => button.removeEventListener(event, callback));
      };
      listen("pointerenter", () => {
        hovered = finePointer.matches;
        render();
      });
      listen("pointerleave", () => {
        hovered = false;
        pressed = false;
        render();
      });
      listen("pointerdown", (event) => {
        if (event.button === 0) {
          pressed = true;
          render();
        }
      });
      listen("pointerup", () => {
        pressed = false;
        render();
      });
      listen("pointercancel", () => {
        pressed = false;
        render();
      });
      listen("focus", () => {
        focused = true;
        render();
      });
      listen("blur", () => {
        focused = false;
        pressed = false;
        render();
      });
      listen("keydown", (event) => {
        if (
          event.key === "Enter" ||
          (event.key === " " && button.tagName === "BUTTON")
        ) {
          pressed = true;
          render();
        }
      });
      listen("keyup", () => {
        pressed = false;
        render();
      });
    });
  return () => removers.forEach((remove) => remove());
}
