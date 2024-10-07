let PokeORTS = {};

function cargarDatosIniciales() {
    fetch('http://localhost:3000/leer-datos')
        .then(response => response.json())
        .then(data => {
            PokeORTS = data;
            inicializarInterfazConDatos();
        });
}

function inicializarInterfazConDatos() {
    document.querySelectorAll('.pokeort-item').forEach((item) => {
        const pokeortID = item.getAttribute('data-id');
        if (pokeortID && PokeORTS[pokeortID]) {
            const pokeortData = PokeORTS[pokeortID];
            item.querySelector('.pokeort-name').textContent = pokeortData.nombre;
            item.querySelector('.pokeort-img').src = pokeortData.src_gif;
        }
    });
    for (let i = 0; i < 3; i++) {
        seleccionarPokeORTAleatorio();
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosIniciales);

let eleccion = 1;
let seleccionados = [];
let BotonOculto = "";

function BloquearPokeort(button) {
    if (seleccionados[eleccion - 1]) {
        document.querySelector(`.selected-pokeort-${eleccion}`).style.backgroundColor = "rgba(0, 255, 0, 0.799)";
        button.style.display = "none";

        if (BotonOculto) {
            BotonOculto.disabled = true;
            BotonOculto.style.display = "none";
        }

        if (eleccion < 3) {
            eleccion++;
            document.getElementById(`BotonDeBloqueo${eleccion}`).style.display = "block";
        } else {
            document.querySelectorAll('.pokeort-container').forEach(el => el.style.display = "none");
            eleccion++;
        }
    }
}

function CambiarPokeort(button) {
    const pokeortID = button.querySelector(".pokeort-name").textContent.trim();
    const pokeort = PokeORTS[pokeortID];
    const imgElement = document.getElementById(`selected-pokeort-display${eleccion}`);

    if (imgElement) {
        imgElement.src = pokeort.src_gif;
        imgElement.style.display = "block";
    }

    document.getElementById(`Pokeort${eleccion}`).textContent = pokeort.nombre;
    seleccionados[eleccion - 1] = pokeort;

    if (BotonOculto) {
        BotonOculto.classList.remove('hidden');
    }

    BotonOculto = button;
    button.classList.add('hidden');
}

function MostrarEstadisticas(button) {
    const pokeortID = button.querySelector(".pokeort-name").textContent.trim();
    const pokeort = PokeORTS[pokeortID];

    if (pokeort) {
        document.getElementById("VIDA").textContent = "VIDA: " + pokeort.vida;
        document.getElementById("VELOCIDAD").textContent = "VELOCIDAD: " + pokeort.velocidad;
        document.getElementById("DAÑO").textContent = "DAÑO: " + pokeort.atk;
        document.getElementById("DEFENSA").textContent = "DEFENSA: " + pokeort.defensa;
    }
}

function BotonesCombinados(button) 
{
    CambiarPokeort(button);
}

let PokemonesEnemigos = [];

function seleccionarPokeORTAleatorio() 
{
    const pokeortIDs = Object.keys(PokeORTS);
    const numeroAleatorio = Math.floor(Math.random() * pokeortIDs.length);
    const pokeortIDAleatorio = pokeortIDs[numeroAleatorio];
    const pokeortAleatorio = PokeORTS[pokeortIDAleatorio];

    PokemonesEnemigos.push(pokeortAleatorio);
}

function EnviarAlCombate() {
    if (eleccion === 4) {
        const datos = {
            Pokeort1: seleccionados[0],
            Pokeort2: seleccionados[1],
            Pokeort3: seleccionados[2],
            PokeortEnemigo1: PokemonesEnemigos[0],
            PokeortEnemigo2: PokemonesEnemigos[1],
            PokeortEnemigo3: PokemonesEnemigos[2],
        };

        fetch('http://localhost:3000/guardar-datos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.text())
        .then(data => 
        {
            window.location.href = "../combate/combate.html";
        });
    }
}
