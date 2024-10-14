fetch('http://localhost:3000/login')
.then(response => response.text())
.then(html => {
    
    document.getElementById('loginFormContainer').innerHTML = html;
})
.catch(error => console.error('Error al cargar el formulario de login:', error));

function CrearUsuario() 
{
    const Inputs = document.querySelectorAll(".InputTexto").text
    console.log(Inputs)
    fetch('http://localhost:3000/leer-datos')
        .then(response => response.json())
        .then(data => {
            Inputs = data;
        });
}
