let PokeortAmigos = [];
let PokeortEnemigos = [];
let PokeortElegidoActual;
let PokeortElegidoEnemigoActual;

window.onload = function() {
    fetch('http://localhost:3000/leer-datos')
    .then(response => response.json())
    .then(data => {
        PokeortAmigos = [data.Pokeort1, data.Pokeort2, data.Pokeort3];
        PokeortEnemigos = [data.PokeortEnemigo1, data.PokeortEnemigo2, data.PokeortEnemigo3];
        console.log(PokeortAmigos);
        console.log(PokeortEnemigos);

        document.getElementById("EleccionPrimerPokemon").src = PokeortAmigos[0].src;
        document.getElementById("EleccionPrimerPokemon2").src = PokeortAmigos[1].src;
        document.getElementById("EleccionPrimerPokemon3").src = PokeortAmigos[2].src;
        document.getElementById("NombrePokeort1").innerHTML = PokeortAmigos[0].nombre;
        document.getElementById("NombrePokeort2").innerHTML = PokeortAmigos[1].nombre;
        document.getElementById("NombrePokeort3").innerHTML = PokeortAmigos[2].nombre;

        document.getElementById("ImagenAmiga2").style.display = "none";
    });
};

let PokeortelegidoCombate = null;
let botonSeleccionado = null;
let botonSeleccionadoID = "";
let turnoJugador = true;
let MedirVelocidad;
let valor = 0;
let TipoDeAtaque;
let cambiabdoPokeort = false;
let cambioAutomatico = false;

// TABLA DE TIPOS
const efectividadTipos = {
    agua: { fuego: 2, planta: 0.5, electrico: 0.5, agua: 1, roca: 2 },
    fuego: { agua: 0.5, planta: 2, electrico: 1, fuego: 1, roca: 0.5 },
    planta: { agua: 2, fuego: 0.5, electrico: 1, planta: 1, roca: 2 },
    electrico: { agua: 2, planta: 0.5, fuego: 1, electrico: 1, roca: 0.5 },
    roca: { agua: 0.5, planta: 0.5, fuego: 2, electrico: 2, roca: 1 }
};

function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
}

function mostrar_pokeort() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
}

function EleccionDePokeortInicial(button) {
    const botones = [
        document.getElementById("BotonDeCambio1"),
        document.getElementById("BotonDeCambio2"),
        document.getElementById("BotonDeCambio3")
    ];
    console.log(botones);
    const PokeortElegidoId = button.querySelector(".ParrafoDeNombre").textContent.trim();
    const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === PokeortElegidoId);
    const PokeortElegidoEnemigo = PokeortEnemigos[0];

    PokeortElegidoActual = pokeortElegido;
    console.log("PokeORT elegido:", PokeortElegidoActual);

    PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
    console.log("PokeORT enemigo elegido:", PokeortElegidoEnemigoActual);

    document.getElementById("pokeort-name-1").innerHTML = pokeortElegido.nombre;
    document.getElementById("ImagenAmiga1").src = pokeortElegido.src_gif_back;
    document.getElementById("ImagenAmiga2").style.display = "block";
    document.getElementById("ImagenAmiga2").src = PokeortElegidoEnemigoActual.src_gif;
    document.getElementById("pokeort-name-2").innerHTML = PokeortElegidoEnemigoActual.nombre;

    document.querySelectorAll(".pokeortInicialEleccion").forEach(button => {
        button.style.display = "none";
    });
    PokeortAmigos.forEach((pokeort, index) => {
        const img = botones[index].querySelector(".ImagenesCambiables");
        img.src = pokeort.src;
        const parrafo = botones[index].querySelector(".ParrafosCambiables");
        parrafo.textContent = pokeort.nombre;
        if (pokeort.nombre === PokeortElegidoId) {
            botones[index].style.display = "none";
        }
    });

    document.getElementById("ImagenAmiga1").style.display = "block";
}
function Funciones(button, index)
{
    if(PokeortElegidoActual.vida <= 0)
    {
        intercambiarPokeortConPokeortMuerto(button, index)
    }
    else
    {
        intercambiarPokeort(button, index)
    }
}
function intercambiarPokeort(button, index) {
    const pokeortElegido = PokeortAmigos[index];
    const img = document.getElementById("ImagenAmiga1");
    const name = document.getElementById("pokeort-name-1");

    name.innerHTML = pokeortElegido.nombre;
    img.style.display = "block";
    img.src = pokeortElegido.src_gif_back;

    PokeortElegidoActual = pokeortElegido;
    console.log("PokeORT elegido:", PokeortElegidoActual);
    
    document.querySelectorAll(".pokeort-cambiable").forEach(button => {
        button.style.display = "block";
    });
    button.style.display = "none";

    realizarTurnoEnemigo(PokeortElegidoActual.tipo)
}
function intercambiarPokeortConPokeortMuerto(button, index) {
    const pokeortElegido = PokeortAmigos[index];
    const img = document.getElementById("ImagenAmiga1");
    const name = document.getElementById("pokeort-name-1");

    name.innerHTML = pokeortElegido.nombre;
    img.style.display = "block";
    img.src = pokeortElegido.src_gif_back;

    PokeortElegidoActual = pokeortElegido;
    console.log("PokeORT elegido:", PokeortElegidoActual);
    
    document.querySelectorAll(".pokeort-cambiable").forEach(button => {
        button.style.display = "block";
    });
    button.style.display = "none";
}


function Rendirse() {
    alert("Te rendiste");
    document.querySelectorAll('*').forEach(element => {
        element.style.display = 'none';
    });
}

// BATALLA
function AdministrarBatalla(button) {
    
        const ataque = button.textContent.trim(); 

        if (ataque === "agua") {
            TipoDeAtaque = "agua";
        } else if (ataque === "planta") {
            TipoDeAtaque = "planta";
        } else if (ataque === "fuego") {
            TipoDeAtaque = "fuego";
        } else if (ataque === "electrico") {
            TipoDeAtaque = "electrico";
        }

    if (PokeortElegidoActual.velocidad > PokeortElegidoEnemigoActual.velocidad) {
        if (realizarTurnoJugador()) return; 
        if (realizarTurnoEnemigo()) return;
    } else if (PokeortElegidoActual.velocidad < PokeortElegidoEnemigoActual.velocidad) { 
        if (realizarTurnoEnemigo()) return; 
        if (realizarTurnoJugador()) return;
    } else {
        const Aleatorio = Math.floor(Math.random() * 2) + 1;
        if (Aleatorio === 1) {
            if (realizarTurnoJugador()) return; 
            if (realizarTurnoEnemigo()) return;
        } else if (Aleatorio === 2) { 
            if (realizarTurnoEnemigo()) return; 
            if (realizarTurnoJugador()) return;
        }
    }
}

function realizarTurnoJugador() {
    
    const daño = CalcularDaño(PokeortElegidoActual, PokeortElegidoEnemigoActual, TipoDeAtaque);
    PokeortElegidoEnemigoActual.vida -= daño;
    if (PokeortElegidoEnemigoActual.vida < 0) {
        PokeortElegidoEnemigoActual.vida = 0;
    }

    console.log(`¡${PokeortElegidoActual.nombre} ataca a ${PokeortElegidoEnemigoActual.nombre} con un ataque de tipo ${TipoDeAtaque} causando ${daño} de daño!`);
    console.log(`${PokeortElegidoEnemigoActual.nombre} tiene ahora ${PokeortElegidoEnemigoActual.vida} de vida.`);

    if (PokeortElegidoEnemigoActual.vida <= 0) {
        alert(`${PokeortElegidoEnemigoActual.nombre} ha sido derrotado.`);
        document.getElementById("ImagenAmiga2").style.display = "none";

        valor =+ 1;
        
        const PokeortElegidoEnemigo = PokeortEnemigos[valor];
        PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
        document.getElementById("ImagenAmiga2").src = PokeortElegidoEnemigoActual.src_gif;
        document.getElementById("ImagenAmiga2").style.display = "block";
        document.getElementById("pokeort-name-2").innerHTML = PokeortElegidoEnemigoActual.nombre;

        if (valor === 3) {
            alert("Ganaste");
        }   
        return true;
    }
    return false;
}


function realizarTurnoEnemigo(tipoooo) {

    if(tipoooo) 
    {
        TipoDefensor = tipoooo
    }
    else 
    {
        TipoDefensor = PokeortElegidoActual.Tipo1;
    }
    const ElementoMasEfectivo = elegirAtaqueMasEfectivo(TipoDefensor);

    const daño = CalcularDaño(PokeortElegidoEnemigoActual, PokeortElegidoActual, ElementoMasEfectivo);

    PokeortElegidoActual.vida -= daño;

    if (PokeortElegidoEnemigoActual.vida < 0) {
        PokeortElegidoEnemigoActual.vida = 0;
    }

    console.log(`¡${PokeortElegidoEnemigoActual.nombre} ataca a ${PokeortElegidoActual.nombre} con un ataque de tipo ${ElementoMasEfectivo} causando ${daño} de daño!`);
    console.log(`${PokeortElegidoActual.nombre} tiene ahora ${PokeortElegidoActual.vida} de vida.`);

    if (PokeortElegidoActual.vida <= 0) {
        alert(`${PokeortElegidoActual.nombre} ha sido derrotado.`);
        mostrar_pokeort();

        document.querySelectorAll(".pokeort-cambiable").forEach(button => {
            const parrafo = button.querySelector(".ParrafosCambiables").textContent.trim();
            if (parrafo === PokeortElegidoActual.nombre) {
                button.disabled = true;
                button.style.opacity = "0.5";
            } else {
                button.style.display = "block";
                button.style.opacity = "1";
            }
        });

        document.getElementById("ImagenAmiga1").style.display = "none";

        const valor =+ 1;
        if (valor === 3) 
        {
            alert("Perdiste");
        }
        return true;
    }
    return false;
}

function CalcularDaño(atacante, defensor, TipoDeAtaque) {
    let daño = Math.abs(atacante.atk - (defensor.defensa) / 2);
    const modificador = efectividadTipos[TipoDeAtaque][defensor.Tipo1] || 1;

    daño = daño * modificador;
    console.log("El ataque de " + TipoDeAtaque + " tiene una efectividad del: " + modificador + " en " + defensor.Tipo1);
    return daño;
}

function elegirAtaqueMasEfectivo(TipoDefensor) {   
    let mejorEfectividad = 1; 
    let mejorAtaque = null; 

    for (const tipo in efectividadTipos) {
        const efectividad = efectividadTipos[tipo][TipoDefensor] || 1; 
        
        if (efectividad > mejorEfectividad) {
            mejorEfectividad = efectividad;
            mejorAtaque = tipo;
        }
    }
    return mejorAtaque; 
}

function mostrarTabla() {
    document.getElementById("aaa").style.display="flex";
}

function cerrarTabla() {
    document.getElementById("aaa").style.display="none";
}
