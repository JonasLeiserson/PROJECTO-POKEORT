const creditos = document.getElementById("creditos_button");
const cerrar = document.getElementById("cerrar");
const menu_creditos = document.getElementById("creditos-menu");

creditos.addEventListener("click", () => {
    menu_creditos.classList.add("show");

});

cerrar.addEventListener("click", () => {
    menu_creditos.classList.remove("show");
});

fetch('http://localhost:3000/login')
.then(response => response.text()) // Obtiene la respuesta como texto
.then(html => {
    // Inserta el formulario de inicio de sesión en el contenedor
    document.getElementById('loginFormContainer').innerHTML = html;
})
.catch(error => console.error('Error al cargar el formulario de login:', error));