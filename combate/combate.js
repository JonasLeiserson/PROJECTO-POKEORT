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
        console.log(PokeortAmigos)
        console.log(PokeortEnemigos)

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
let turnoJugador = true;
let MedirVelocidad;
let valor = 0
let TipoDeAtaque

const efectividadTipos = {
    agua: {
        fuego: 2,  // Agua es 2x más fuerte contra Fuego
        planta: 2, // Agua es 2x más fuerte contra Tierra
        electrico: 0.5, // Agua es 0.5x efectivo contra Eléctrico
        agua: 0.5  // Agua es 0.5x menos efectivo contra Agua
    },
    fuego: {
        agua: 0.5,  // Fuego es 0.5x menos efectivo contra Agua
        planta: 1,  // Fuego es neutral contra Tierra
        electrico: 1,  // Fuego es neutral contra Eléctrico
        fuego: 0.5   // Fuego es menos efectivo contra Fuego
    },
    planta: {
        agua: 0.5,  // Tierra es 0.5x menos efectivo contra Agua
        fuego: 2,  // Tierra es 2x más fuerte contra Fuego
        electrico: 2,  // Tierra es 2x más fuerte contra Eléctrico
        planta: 0.5   // Tierra es menos efectivo contra Tierra
    },
    electrico: {
        agua: 2,  // Eléctrico es 2x más fuerte contra Agua
        planta: 0.5,  // Eléctrico no tiene efecto contra Tierra
        fuego: 1,  // Eléctrico es neutral contra Fuego
        electrico: 0.5   // Eléctrico es menos efectivo contra Eléctrico
    }
};



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
console.log(botones)
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
    img.style.display = "block"
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

function AdministrarBatalla(button) 
{
        const ataque = button.textContent.trim();    
        
        console.log(TipoDeAtaque)
        if (ataque === "agua")
            {
            console.log("Es un ataque de agua");
            TipoDeAtaque = "agua"
            }
        else if (ataque === "planta")
                {
                console.log("Es un ataque de planta");
                TipoDeAtaque = "planta"
                }
                else if (ataque === "fuego")
                    {
                    console.log("Es un ataque de Fuego");
                    TipoDeAtaque = "fuego"
                    }
                    else if (ataque === "electrico")
                        {
                        console.log("Es un ataque de Electricidad");
                        TipoDeAtaque = "electrico"
                        }
    



        if(PokeortElegidoActual.velocidad  > PokeortElegidoEnemigoActual.velocidad)
        {
            if (realizarTurnoJugador()) return; 
            if (realizarTurnoEnemigo()) return;
        }
        else if(PokeortElegidoActual.velocidad  <  PokeortElegidoEnemigoActual.velocidad)
        { 
            if (realizarTurnoEnemigo()) return; 
            if (realizarTurnoJugador()) return;
        }
        else 
        {
            Aleatorio =  Math.floor(Math.random() * 2) + 1;
            if(Aleatorio === 1)
            {
                if (realizarTurnoJugador()) return; 
                if (realizarTurnoEnemigo()) return;
            }
            else if(Aleatorio === 2)
                { 
                    if (realizarTurnoEnemigo()) return; 
                    if (realizarTurnoJugador()) return;
                }
            
        }
}



function realizarTurnoJugador() 
{

    const daño = CalcularDaño(PokeortElegidoActual, PokeortElegidoEnemigoActual, TipoDeAtaque);
    PokeortElegidoEnemigoActual.vida -= daño;

    console.log(`¡${PokeortElegidoActual.nombre} ataca a ${PokeortElegidoEnemigoActual.nombre} causando ${daño} de daño!`);
    console.log(`${PokeortElegidoEnemigoActual.nombre} tiene ahora ${PokeortElegidoEnemigoActual.vida} de vida.`);

    if (PokeortElegidoEnemigoActual.vida <= 0) 
    {
        alert(`${PokeortElegidoEnemigoActual.nombre} ha sido derrotado.`);
        document.getElementById("ImagenAmiga2").style.display = "none";

        valor +=  1

        const PokeortElegidoEnemigo = PokeortEnemigos[valor]
        PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
        document.getElementById("ImagenAmiga2").src = PokeortElegidoEnemigoActual.src
        document.getElementById("ImagenAmiga2").style.display = "block";


        if(valor === 3)
{
    alert("Ganaste")
}   
    return true;
}
return false;
}


function realizarTurnoEnemigo()
{
    const daño = CalcularDañoEnemigo(PokeortElegidoEnemigoActual, PokeortElegidoActual);
    PokeortElegidoActual.vida -= daño;

    console.log(`¡${PokeortElegidoEnemigoActual.nombre} ataca a ${PokeortElegidoActual.nombre} causando ${daño} de daño!`);
    console.log(`${PokeortElegidoActual.nombre} tiene ahora ${PokeortElegidoActual.vida} de vida.`);

    if (PokeortElegidoActual.vida <= 0) 
        {
        alert(`${PokeortElegidoActual.nombre} ha sido derrotado.`);

            mostrar_pokeort()

            document.querySelectorAll(".pokeort").forEach(button => 
            {
                document.querySelectorAll(".pokeort").forEach(button => {
                    const parrafo = button.querySelector(".ParrafosCambiables").textContent.trim();
                    if (parrafo === PokeortElegidoActual.nombre) 
                    {
                        button.disabled = true;
                        button.style.opacity = "0.5";
                    } else 
                    {
                        button.style.display = "block"
                        button.style.opacity = "1";
                    }
                });
        
                button.style.display = "block"
            });
            document.getElementById("ImagenAmiga1").style.display = "none";
            return true;
    } 
    return false;
}


function CalcularDaño(atacante, defensor, TipoDeAtaque) 
{
    console.log(defensor);
    let daño =  Math.abs(atacante.atk - (defensor.defensa)/2);
    const modificador = efectividadTipos[TipoDeAtaque][defensor.Tipo1] || 1;

    daño = daño*modificador
    console.log(modificador)
    return daño;

}
function CalcularDañoEnemigo(atacante, defensor) 
{
    console.log(atacante);
    console.log(defensor);
    const daño =  Math.abs(atacante.atk - (defensor.defensa)/2);
    return daño;

}
