let PokeortAmigos = [Pokeort1, Pokeort2, Pokeort3]
let PokeORTS = null;
let PokeortEnemigos = [PokeortEnemigo1, PokeortEnemigo2, PokeortEnemigo3]

window.onload = function() {
    fetch('http://localhost:3000/leer-datos')
    .then(response => response.json())
    .then(data => {
        if (!data.Pokeort1 || !data.Pokeort2 || !data.Pokeort3) {
            console.error('Error: Datos incompletos recibidos del servidor.');
            alert('Error: Datos incompletos recibidos del servidor.');
            return;
        }

        Pokeort1 = data.Pokeort1;
        Pokeort2 = data.Pokeort2;
        Pokeort3 = data.Pokeort3;
        PokeORTS = data.PokeORTS;
        PokeortEnemigo1 = data.PokeortEnemigo1;
        PokeortEnemigo2 = data.PokeortEnemigo2;
        PokeortEnemigo3 = data.PokeortEnemigo3;

        console.log('Datos recibidos:', data);

        document.getElementById("EleccionPrimerPokemon").src = Pokeort1.src;
        document.getElementById("EleccionPrimerPokemon2").src = Pokeort2.src;
        document.getElementById("EleccionPrimerPokemon3").src = Pokeort3.src;

        document.getElementById("ImagenAmiga2").src = PokeortEnemigo1.src;
        document.getElementById("ImagenAmiga2").style.display = "none";
        
        window.pokeortsData = { Pokeort1, Pokeort2, Pokeort3 };
    })
    .catch(error => {
        console.error('Error al cargar los datos del servidor:', error);
        alert('Error al cargar los datos del servidor.');
    });
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
const PokeortElegido =  button.querySelector(".ParrafoDeNombre").textContent.trim();

}

function Rendirse() {
    alert("Te rendiste");
}

function CalcularDaño() {
    if (!Pokeort1) {
        alert("Error: Pokeort1 no está definido.");
        return;
    }
    console.log(botonSeleccionado);
}
