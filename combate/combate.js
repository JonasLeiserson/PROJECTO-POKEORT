let Pokeort1 = null;
let Pokeort2 = null;
let Pokeort3 = null;
let PokeORTS = null;
let PokeortEnemigo1 = null;
let PokeortEnemigo2 = null;
let PokeortEnemigo3 = null;

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

function EleccionDePokeortInicial(button) {
    const ImagenDePokemon = button.querySelector(".ImagenCombate").src;

    document.getElementById("ImagenAmiga2").style.display = "block";
    document.getElementById("ImagenAmiga1").src = ImagenDePokemon;
    
    botonSeleccionado = button;
    botonSeleccionadoID = button.id;
    
    // Establecer el Pokeort elegido para combate
    if (botonSeleccionadoID === "BotonDeEleccion1") {
        PokeortelegidoCombate = Pokeort1;
    } else if (botonSeleccionadoID === "BotonDeEleccion2") {
        PokeortelegidoCombate = Pokeort2;
    } else {
        PokeortelegidoCombate = Pokeort3;
    }

    // Actualizar imágenes y nombres en los botones de cambio
    const pokeorts = [
        { id: "BotonDeCambio1", pokeort: Pokeort1 },
        { id: "BotonDeCambio2", pokeort: Pokeort2 },
        { id: "BotonDeCambio3", pokeort: Pokeort3 }
    ];

    pokeorts.forEach(({ id, pokeort }) => {
        const button = document.getElementById(id);
        if (pokeort !== PokeortelegidoCombate) {
            button.style.display = "block";
            button.querySelector("img").src = pokeort.src;
            button.querySelector("p").textContent = "Nombre del Pokeort"; // Reemplaza con el nombre real
        } else {
            button.style.display = "none";
        }
    });
}

function intercambiarPokeort(pokeortButton, index) {
    const imagenSeleccionada = pokeortButton.querySelector("img").src;
    const textoSeleccionado = pokeortButton.querySelector("p").textContent;

    pokeortButton.querySelector("img").src = botonSeleccionado.querySelector(".ImagenCombate").src;
    pokeortButton.querySelector("p").textContent = botonSeleccionado.querySelector(".ParrafoDeNombre").textContent;

    botonSeleccionado.querySelector(".ImagenCombate").src = imagenSeleccionada;
    botonSeleccionado.querySelector(".ParrafoDeNombre").textContent = textoSeleccionado;

    document.getElementById("ImagenAmiga1").src = botonSeleccionado.querySelector(".ImagenCombate").src;

    pokeortButton.style.display = "none";

    // Mostrar botones de cambio restantes
    const pokeorts = [
        "BotonDeCambio1",
        "BotonDeCambio2",
        "BotonDeCambio3"
    ];

    pokeorts.forEach(id => {
        if (id !== pokeortButton.id) {
            document.getElementById(id).style.display = "block";
        }
    });
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
