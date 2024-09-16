let PokeortAmigos = []
let PokeortEnemigos = []

window.onload = function() {
    fetch('http://localhost:3000/leer-datos')
    .then(response => response.json())
    .then(data => {
        if (!data.Pokeort1 || !data.Pokeort2 || !data.Pokeort3) {
            console.error('Error: Datos incompletos recibidos del servidor.');
            alert('Error: Datos incompletos recibidos del servidor.');
            return;
        }

        PokeortAmigos = [data.Pokeort1,  data.Pokeort2, data.Pokeort3];
        PokeortEnemigos = [data.PokeortEnemigo1, data.PokeortEnemigo2, data.PokeortEnemigo3]
        console.log('Datos recibidos:', data);

        document.getElementById("EleccionPrimerPokemon").src = PokeortAmigos[0].src;
        document.getElementById("EleccionPrimerPokemon2").src = PokeortAmigos[1].src;
        document.getElementById("EleccionPrimerPokemon3").src = PokeortAmigos[2].src;
        
        document.getElementById("NombrePokeort1").innerHTML = PokeortAmigos[0].nombre
        document.getElementById("NombrePokeort2").innerHTML = PokeortAmigos[1].nombre
        document.getElementById("NombrePokeort3").innerHTML = PokeortAmigos[2].nombre

        document.getElementById("ImagenAmiga2").style.display = "none";
    })
};

let PokeortelegidoCombate = null;
let botonSeleccionado = null;
let botonSeleccionadoID = "";



function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
}

function mostrar_pokeort() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
}

function EleccionDePokeortInicial(button) 
{
    const botones = 
    [
        document.getElementById("BotonDeCambio1"),
        document.getElementById("BotonDeCambio2"),
        document.getElementById("BotonDeCambio3")
    ];

const PokeortElegidoId =  button.querySelector(".ParrafoDeNombre").textContent.trim();
const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === PokeortElegidoId);
document.getElementById("ImagenAmiga1").src = pokeortElegido.src

document.querySelectorAll(".BotonDeEleciion").forEach(button => 
{
button.style.display = "none";
});
PokeortAmigos.forEach((pokeort, index) =>
{
    if (botones[index]) 
    {
        const img = botones[index].querySelector(".ImagenesCambiables") 
        img.src = pokeort.src  
       const parrafo =  botones[index].querySelector(".ParrafosCambiables") 
       parrafo.textContent = pokeort.nombre  
    }
});
}
function intercambiarPokeort(button, index)
{
    const pokeortElegido = PokeortAmigos[index];
    const img = button.querySelector(".ImagenAmiga1");

        img.src = pokeortElegido.src;
    
        
}

function Rendirse() {
    alert("Te rendiste");
}

function CalcularDaño() 
{

}
