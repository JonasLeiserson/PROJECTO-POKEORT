
let PokeORTS = {};

function cargarDatosIniciales() {
    //Cambiar a soqueTIC
    fetch('http://localhost:3000/leer-datos')
        .then(response => response.json())
        .then(data => {
            PokeORTS = data;
            console.log('Datos cargados:', PokeORTS);
            inicializarInterfazConDatos();
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function inicializarInterfazConDatos() {
    if (PokeORTS) {
        document.querySelectorAll('.pokeort-item').forEach((item) => {
            const pokeortID = item.getAttribute('data-id');

            if (pokeortID && PokeORTS[pokeortID]) {
                const pokeortData = PokeORT  [pokeortID];

                item.querySelector('.pokeort-name').textContent = pokeortData.nombre;
                item.querySelector('.pokeort-img').src = pokeortData.src;
            } else {
                console.warn(`No se encontró un PokeORT con el ID: ${pokeortID}`);
            }
        });
        for (let i = 0; i < 3; i++)
        {
            seleccionarPokeORTAleatorio();
        }
    } else {
        console.error('PokeORTS no está definido o está vacío');
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosIniciales);

let eleccion = 1;
let seleccionados = [];
let contraseña = "";
let BotonOculto = "";


function BloquearPokeort(button) {
    if (seleccionados[eleccion - 1]) {
        document.querySelector(`.selected-pokeort-${eleccion}`).style.backgroundColor = "rgba(0, 255, 0, 0.799)";
        button.style.display = "none";

        if (BotonOculto) {
            BotonOculto.disabled = true;
            BotonOculto.style.display = "none";
        }

        if (eleccion === 1 && seleccionados[0].nombre !== "PokeORT 1") {
            eleccion++;
            document.getElementById(`BotonDeBloqueo${eleccion}`).style.display = "block";
        } else if (eleccion === 2 && seleccionados[1].nombre !== "PokeORT 2") {
            eleccion++;
            document.getElementById(`BotonDeBloqueo${eleccion}`).style.display = "block";
        } else if (eleccion === 3 && seleccionados[2].nombre !== "PokeORT 3") {
            document.querySelectorAll('.pokeort-container').forEach(el => el.style.display = "none");
            eleccion++;
        } else {
            alert("Selecciona un PokeORT Primero");
        }
    } else {
        alert("Selecciona un PokeORT Primero");
    }
}



function CambiarPokeort(button) {
    const pokeortID = button.querySelector(".pokeort-name").textContent.trim();
    const pokeort = PokeORTS[pokeortID];
    const imgElement = document.getElementById(`selected-pokeort-display${eleccion}`);

    if (imgElement) {
        imgElement.src = pokeort.src_gif;
        imgElement.style.display = "block";
    } else {
        alert(`No se encontró el elemento con ID 'selected-pokeort-display${eleccion}'`);
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
    } else {
        console.error("PokeORT not found:", pokeortID);
    }
}

function EasterEgg(button) {
    const pokeortID = button.querySelector(".pokeort-name").textContent.trim();
    const pokeort = PokeORTS[pokeortID];

    contraseña += pokeort.NumeroSecreto.toString();
    if (contraseña === "1987") {
        document.getElementById("kibidi").style.display = "block";
    }
}

function BotonesCombinados(button)
{
    CambiarPokeort(button);
    EasterEgg(button);
}

let PokemonesEnemigos = [];

function seleccionarPokeORTAleatorio() {
    const pokeortIDs = Object.keys(PokeORTS);
    const numeroAleatorio = Math.floor(Math.random() * pokeortIDs.length); 
    const pokeortIDAleatorio = pokeortIDs[numeroAleatorio]; 
    const pokeortAleatorio = PokeORTS[pokeortIDAleatorio];

    if (!pokeortAleatorio) {
        console.warn(`PokeORT aleatorio no encontrado: ${pokeortIDAleatorio}`);
        return seleccionarPokeORTAleatorio(); 
    }

    console.log(pokeortAleatorio);
    PokemonesEnemigos.push(pokeortAleatorio);
    return pokeortAleatorio;
}






function EnviarAlCombate() {
    if (eleccion === 4) {
        const datos = 
        {
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Datos enviados al servidor:', data);
            window.location.href = "../combate/combate.html";
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        });
    } else {
        alert("Primero selecciona 3 pokeorts");
    }
}