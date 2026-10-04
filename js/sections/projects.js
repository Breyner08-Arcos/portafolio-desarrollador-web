export function initProjects(section) {
  const controls = section.querySelector(".project-filters");
  const cards = [...section.querySelectorAll("[data-category]")];
  const status = section.querySelector("#project-status");
  if (!controls || !cards.length) return;

  const count = controls.querySelector('[data-filter="all"] span');
  if (count) count.textContent = String(cards.length).padStart(2, "0");

  controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button || !controls.contains(button)) return;
    const category = button.dataset.filter;
    controls.querySelectorAll("[data-filter]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    let visible = 0;
    cards.forEach((card) => {
      card.hidden =
        category !== "all" &&
        !card.dataset.category.split(" ").includes(category);
      if (!card.hidden) visible += 1;
    });
    if (status)
      status.textContent = `${visible} ${visible === 1 ? "proyecto visible" : "proyectos visibles"}.`;
  });
  // Si el módulo no carga, todos los proyectos permanecen visibles sin controles inertes.
  controls.hidden = false;
}
