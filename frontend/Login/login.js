fetch('http://localhost:3000/login')
.then(response => response.text()) // Obtiene la respuesta como texto
.then(html => {
    // Inserta el formulario de inicio de sesión en el contenedor
    document.getElementById('loginFormContainer').innerHTML = html;
})
.catch(error => console.error('Error al cargar el formulario de login:', error));