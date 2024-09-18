let PokeortAmigos = []
let PokeortEnemigos = []
let PokeortElegidoActual ;
let PokeortElegidoEnemigoActual ;

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
let turnoJugador = true


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
const PokeortElegidoEnemigo = PokeortEnemigos[0]

PokeortElegidoActual = pokeortElegido;
console.log("PokeORT elegido:", PokeortElegidoActual);

PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
console.log("PokeORT enemigo elegido:", PokeortElegidoEnemigoActual);

document.getElementById("ImagenAmiga1").src = pokeortElegido.src

document.getElementById("ImagenAmiga2").style.display = "block";

document.getElementById("ImagenAmiga2").src = PokeortElegidoEnemigoActual.src

document.querySelectorAll(".BotonDeEleciion").forEach(button => 
{
button.style.display = "none";
});
PokeortAmigos.forEach((pokeort, index) =>
{
        const img = botones[index].querySelector(".ImagenesCambiables") 
        img.src = pokeort.src  
        const parrafo =  botones[index].querySelector(".ParrafosCambiables") 
        parrafo.textContent = pokeort.nombre       
        if (pokeort.nombre === PokeortElegidoId) 
        {
            botones[index].style.display = "none";
        }
});

}
function intercambiarPokeort(button, index)
{

    const pokeortElegido = PokeortAmigos[index];
    const img = document.getElementById("ImagenAmiga1")
    img.src = pokeortElegido.src;
    
    PokeortElegidoActual = pokeortElegido;
    console.log("PokeORT elegido:", PokeortElegidoActual);
    
    document.querySelectorAll(".pokeort").forEach(button => 
        {
        button.style.display = "block";
        });
        button.style.display = "none"
}

function Rendirse() {
    alert("Te rendiste");
}

function CalcularDaño(atacante, defensor) 
{
    console.log(atacante);
    console.log(defensor);
    const daño =  Math.abs(atacante.atk - defensor.defensa);
    return daño;

}
turnoJugador = true;

function realizarTurno() {
if (turnoJugador) 
{
    const daño = CalcularDaño(PokeortElegidoActual, PokeortElegidoEnemigoActual);
    PokeortElegidoEnemigoActual.vida -= daño;

    console.log(`¡${PokeortElegidoActual.nombre} ataca a ${PokeortElegidoEnemigoActual.nombre} causando ${daño} de daño!`);
    console.log(`${PokeortElegidoEnemigoActual.nombre} tiene ahora ${PokeortElegidoEnemigoActual.vida} de vida.`);

    if (PokeortElegidoEnemigoActual.vida <= 0) 
    {
        alert(`${PokeortElegidoEnemigoActual.nombre} ha sido derrotado.`);
        document.getElementById("ImagenAmiga2").style.display = "none";

        
        const PokeortElegidoEnemigo = PokeortEnemigos[1]
        PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
        document.getElementById("ImagenAmiga2").src = PokeortElegidoEnemigoActual.src
        document.getElementById("ImagenAmiga2").style.display = "block";
    } else 
    {
    
    }
    
} else {
    const daño = CalcularDaño(PokeortElegidoEnemigoActual, PokeortElegidoActual);
    PokeortElegidoActual.vida -= daño;

    console.log(`¡${PokeortElegidoEnemigoActual.nombre} ataca a ${PokeortElegidoActual.nombre} causando ${daño} de daño!`);
    console.log(`${PokeortElegidoActual.nombre} tiene ahora ${PokeortElegidoActual.vida} de vida.`);

    if (PokeortElegidoActual.vida <= 0) {
        alert(`${PokeortElegidoActual.nombre} ha sido derrotado.`);
    } else {
        turnoJugador = true;
        realizarTurno();  
    }
}
}
