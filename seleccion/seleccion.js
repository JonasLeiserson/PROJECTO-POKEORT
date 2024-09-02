let PokeORTS = {};

function cargarDatosIniciales() {
    fetch('http://localhost:3000/leer-datos')
        .then(response => response.json())
        .then(data => {
            PokeORTS = data;  // Almacena los datos en la variable global
            console.log('Datos cargados:', PokeORTS);
            inicializarInterfazConDatos(); // Función para actualizar la interfaz con los datos cargados
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Llama a cargarDatosIniciales cuando la página se cargue
document.addEventListener('DOMContentLoaded', cargarDatosIniciales);

let eleccion = 1;
let seleccionados = [];
let contraseña = "";
let BotonOculto = "";
let pokeort = ""

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
        imgElement.src = pokeort.src;
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

    document.getElementById("VIDA").textContent = "VIDA: " + pokeort.vida;
    document.getElementById("VELOCIDAD").textContent = "VELOCIDAD: " + pokeort.velocidad;
    document.getElementById("DAÑO").textContent = "DAÑO: " + pokeort.atk;
    document.getElementById("DEFENSA").textContent = "DEFENSA: " + pokeort.defensa;
}

function EasterEgg(button) {
    const pokeortID = button.querySelector(".pokeort-name").textContent.trim();
    const pokeort = PokeORTS[pokeortID];

    contraseña += pokeort.NumeroSecreto.toString();
    if (contraseña === "1987") {
        document.getElementById("kibidi").style.display = "block";
    }
}

function EnviarAlCombate() 
{
    if (eleccion === 4) {
        sessionStorage.setItem('PokeORTS', JSON.stringify(PokeORTS));
        sessionStorage.setItem('Pokeort1', JSON.stringify(seleccionados[0]));
        sessionStorage.setItem('Pokeort2', JSON.stringify(seleccionados[1]));
        sessionStorage.setItem('Pokeort3', JSON.stringify(seleccionados[2]));
        window.location.href = "../combate/combate.html";
    } else {
        alert("Primero selecciona 3 pokeorts");
    }
}

function BotonesCombinados(button) {
    CambiarPokeort(button);
    EasterEgg(button);



    //Serverrr
}
function enviarDatosAlServidor() {
    // Definición de los datos que se enviarán al servidor
    

    // Agrupamos todos los datos en un solo objeto
    const datos = {
    
    };

    // Enviar los datos al servidor usando fetch
    fetch('http://localhost:3000/guardar-datos', {
        method: 'POST', // Método HTTP para enviar datos
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido de los datos enviados
        },
        body: JSON.stringify(datos) // Convertir los datos a formato JSON para enviarlos
    })
    .then(response => response.text()) // Manejar la respuesta del servidor
    .then(data => {
        console.log('Datos enviados al servidor:', data); // Mostrar un mensaje de éxito
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error); // Mostrar un error si falla
    });
}