const opciones = document.getElementById("opciones");
const cerrar = document.getElementById("cerrar");
const menu = document.getElementById("opciones_menu");

opciones.addEventListener("click", () => {
    menu.classList.add("show");
});

cerrar.addEventListener("click", () => {
    menu.classList.remove("show");
});