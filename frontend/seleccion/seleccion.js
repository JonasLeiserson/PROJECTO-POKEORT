let PokeORTS = {};
let ModoDeJuego2Jugadores = localStorage.getItem('DosJugadores') === 'true' ? true : false; 

if(ModoDeJuego2Jugadores === "true")
{
    ModoDeJuego2Jugadores = true
}
console.log("Modo de 2 jugador = " + ModoDeJuego2Jugadores)
function cargarDatosIniciales() {
    fetch('http://localhost:3000/leer-datos')
        .then(response => response.json())
        .then(data => {
            PokeORTS = data;
            inicializarInterfazConDatos();
        });
}

function inicializarInterfazConDatos() 
{
    document.querySelectorAll('.pokeort-item').forEach((item) => {
        const pokeortID = item.getAttribute('data-id');
        if (pokeortID && PokeORTS[pokeortID]) 
        {
            const pokeortData = PokeORTS[pokeortID];
            item.querySelector('.pokeort-name').textContent = pokeortData.nombre;
            item.querySelector('.pokeort-img').src = pokeortData.src_gif;
        }
    });

    if(ModoDeJuego2Jugadores === false)
    {
        for (let i = 0; i < 3; i++) 
            {
                seleccionarPokeORTAleatorio();
            }
    }
    
}
if(ModoDeJuego2Jugadores === true)
{
    console.log("Mostrado")
    document.getElementById("PokemonesJugador2").style.display =  "flex";
}
else 
{
    console.log("Escondido")
    document.getElementById("PokemonesJugador2").style.display =  "none";
}


document.addEventListener('DOMContentLoaded', cargarDatosIniciales);

let turno = "Jugador1"
let eleccion = 1;
let eleccionJugador2 = 1
let seleccionados = [];
let seleccionadosJugador2 = [];
let PokemonesEnemigos = [];
let BotonOculto = "";

function BloquearPokeort(button, JugadorQueElije) {
    if (JugadorQueElije === "Jugador1") {
        if (seleccionados[eleccion - 1]) {
            document.querySelector(`.selected-pokeort-${eleccion}`).style.backgroundColor = "rgba(0, 255, 0, 0.799)";
        }
    } else if (JugadorQueElije === "Jugador2") {
        if (seleccionadosJugador2[eleccionJugador2 - 1]) {
            document.querySelector(`.selected-pokeortJugador2-${eleccionJugador2}`).style.backgroundColor = "rgba(0, 255, 0, 0.799)";
        }
    }

    button.style.display = "none";

    if (BotonOculto) {
        BotonOculto.disabled = true;
        BotonOculto.classList.add('deshabilitado-permanente');
    }

    if (ModoDeJuego2Jugadores === true) 
        {
        if (JugadorQueElije === "Jugador1") 
        {
            
            turno = "Jugador2";
            document.getElementById(`BotonDeBloqueo${eleccionJugador2}Jugador2`).style.display = "block";
            if (eleccion <= 3) {
                eleccion++;
            }
        } 
        else if (JugadorQueElije === "Jugador2") 
        {   
            turno = "Jugador1";
            if(eleccion < 4 )
            {
                document.getElementById(`BotonDeBloqueo${eleccion}`).style.display = "block";
            }
            if (eleccionJugador2 <= 3) 
                {
                    eleccionJugador2++;
                }
        }
    } 
    else 
    {
        if (eleccion <= 3) 
        {
            eleccion++;
            if (eleccion >= 4 ) 
            {

                document.querySelector('.footer').style.display = "none";
                document.getElementById('header').style.position = "fixed";
                document.getElementById('header').style.top = "0";
                document.querySelector('.ability-container').style.display = "none";
                document.querySelector('.divDeLaDerecha').style.display = "none";
            }
            document.getElementById(`BotonDeBloqueo${eleccion}`).style.display = "block";
        }
    }

    if (eleccion >= 4 && eleccionJugador2 >= 4) {
        document.querySelector('.footer').style.display = "none";
        document.getElementById('header').style.position = "fixed";
        document.getElementById('header').style.top = "0";
        document.querySelector('.ability-container').style.display = "none";
        document.querySelector('.divDeLaDerecha').style.display = "none";
    }

}



function CambiarPokeort(button) {
    const pokeortID = button.querySelector(".pokeort-name").textContent.trim();
    const pokeort = PokeORTS[pokeortID];
    if( turno === "Jugador1")
    {
        const imgElement = document.getElementById(`selected-pokeort-display${eleccion}`);

        imgElement.src = pokeort.src_gif;
        imgElement.style.display = "block";

        document.getElementById(`Pokeort${eleccion}`).textContent = pokeort.nombre;
        seleccionados[eleccion - 1] = pokeort;
    }
    else
    {
        const imgElement = document.getElementById(`Jugador2selected-pokeort-display${eleccionJugador2}`);

        imgElement.src = pokeort.src_gif;
        imgElement.style.display = "block";

        document.getElementById(`Pokeort${eleccionJugador2}Jugador2`).textContent = pokeort.nombre;
        seleccionadosJugador2[eleccionJugador2 - 1] = pokeort;
    }

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

function seleccionarPokeORTAleatorio() 
{
    const pokeortIDs = Object.keys(PokeORTS);
    const numeroAleatorio = Math.floor(Math.random() * pokeortIDs.length);
    const pokeortIDAleatorio = pokeortIDs[numeroAleatorio];
    const pokeortAleatorio = PokeORTS[pokeortIDAleatorio];

    PokemonesEnemigos.push(pokeortAleatorio);
}



function EnviarAlCombate() 
{
    if(ModoDeJuego2Jugadores === false)
    {
        if (eleccion === 4) 
        {
            const datos = 
            {
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
    else
    {
        if (eleccionJugador2 === 4) 
            {
                const datos = 
                {
                    Pokeort1: seleccionados[0],
                    Pokeort2: seleccionados[1],
                    Pokeort3: seleccionados[2],
                    PokeortEnemigo1: seleccionadosJugador2[0],
                    PokeortEnemigo2: seleccionadosJugador2[1],
                    PokeortEnemigo3: seleccionadosJugador2[2],
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
}