// Excepción intencional: script clásico diminuto, previo al CSS, sin dependencias.
// Debe conservarse en public/ para que Vite lo copie sin cambiar su ejecución.
(() => {
  let theme = "dark";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {
    // El tema sigue funcionando aunque el navegador bloquee el almacenamiento.
  }
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#080b0d" : "#f7fafc");
})();
