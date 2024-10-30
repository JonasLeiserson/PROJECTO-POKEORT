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
            BotonOculto.classList.add('desabilitado-permanente');
        }

        if (eleccion < 3) {
            eleccion++;
            document.getElementById(`BotonDeBloqueo${eleccion}`).style.display = "block";
        } else {
            document.querySelector('.footer').style.display = "none";
            document.getElementById('header').style.position = "fixed";
            document.getElementById('header').style.top = "0";
            document.querySelector('.ability-container').style.display = "none";
            document.querySelector('.divDeLaDerecha').style.display = "none";
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

        document.getElementById("Ability1").textContent =  pokeort.ataques[0].nombre;
        document.getElementById("Ability2").textContent =  pokeort.ataques[1].nombre;
        document.getElementById("Ability3").textContent =  pokeort.ataques[2].nombre;
        document.getElementById("Ability4").textContent =  pokeort.ataques[3].nombre;
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
        }

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

let reglas = [
    document.getElementById('stats'),
    document.getElementById('ataques-r'),
    document.getElementById('suerte'),
    document.getElementById('tabla'),
    document.getElementById('pociones'),
    document.getElementById('turnos')
]

function mostrarReglas(regla) {
    regla.style.display = "block";
}

function ocultarReglas(regla) {
    regla.style.display = "none";
}

function comoSeJuega() {
    document.getElementById('comosejuega').style.display = 'flex';
}

function ocultarComoSeJuega() {
    document.getElementById('comosejuega').style.display = 'none';
}