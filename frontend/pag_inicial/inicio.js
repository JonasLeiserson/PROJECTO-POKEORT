const creditos = document.getElementById("creditos_button");
const cerrar = document.getElementById("cerrar");
const menu_creditos = document.getElementById("creditos-menu");

creditos.addEventListener("click", () => {
    menu_creditos.classList.add("show");

});

cerrar.addEventListener("click", () => {
    menu_creditos.classList.remove("show");
});

