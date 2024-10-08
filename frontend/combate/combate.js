
let PokeortAmigos = [];
let PokeortEnemigos = [];
let PokeortElegidoActual;
let PokeortElegidoEnemigoActual;
let PokeortAmigosDerrotados = [];
let PokeortEnemigosDerrotados = [];

window.onload = function() {
    fetch('http://localhost:3000/leer-datos-de-pokeorts')
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
let valorEnemigo = 0;
let valorJugador = 0
let TipoDeAtaque;
let cambioManual = true;
let SeleccionandoObjeto = false;
let QueHacePocion = 0

// TABLA DE TIPOS
const efectividadTipos = {
    agua: { fuego: 2, planta: 0.5, electrico: 1, agua: 1, roca: 2 },
    fuego: { agua: 0.5, planta: 2, electrico: 1, fuego: 1, roca: 0.5 },
    planta: { agua: 2, fuego: 0.5, electrico: 1, planta: 0.5, roca: 2 },
    electrico: { agua: 2, planta: 0.5, fuego: 1, electrico: 1, roca: 0.5 },
    roca: { agua: 0.5, planta: 1, fuego: 2, electrico: 2, roca: 1 }
};

function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
    document.getElementById("accionPokeort-div").style.display = "none";
}

function MostrarObjetos() {
    document.getElementById("cambiar-pokeort").style.display = "none";
    document.getElementById("accionPokeort-div").style.display = "none";
    document.getElementById("ataques").style.display = "none";
    document.getElementById("DivDeObjetos").style.display = "flex";
}
function mostrar_pokeort() {
    const PokeortElegidoId = PokeortElegidoActual.pokeortID;
    const botones = [
        document.getElementById("BotonDeCambio1"),
        document.getElementById("BotonDeCambio2"),
        document.getElementById("BotonDeCambio3")
    ];

    document.getElementById("ataques").style.display = "none";
    document.getElementById("accionPokeort-div").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
    let cancelar = document.getElementById("cancelar");

    if(SeleccionandoObjeto === true)
    {
        document.querySelectorAll('.pokeort-cambiable').forEach((button) => {
            button.style.display = "block";
        });
        cancelar.style.display = "block";
    }
    else
    {
        PokeortAmigos.forEach((pokeort, index) => {
            const img = botones[index].querySelector(".ImagenesCambiables");
            img.src = pokeort.src;
            const parrafo = botones[index].querySelector(".ParrafosCambiables");
            parrafo.textContent = pokeort.nombre;
            if (pokeort.nombre === PokeortElegidoId) {
                botones[index].style.display = "none";
            }
            cancelar.style.display = "none";
        });
    }

    cancelar.addEventListener("click", () => {
        SeleccionandoObjeto = false;
        ocultarTodo();
        document.querySelectorAll(".option").forEach(option => {
            option.disabled = false;
        });
    });
    }

function ocultarTodo() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "none";
    document.getElementById("DivDeObjetos").style.display = "none";
    document.getElementById("accionPokeort-div").style.display = "flex";
}

function EleccionDePokeortInicial(button) {
    
    let botones = 
    [
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

    document.getElementById("pokeort-name-menu").innerHTML = pokeortElegido.nombre;
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


let buttons = [
    document.getElementById("BotonDeCambio1"),
    document.getElementById("BotonDeCambio2"),
    document.getElementById("BotonDeCambio3")
]


function intercambiarPokeort(button, index) {
    if(SeleccionandoObjeto === true)
    {
        const BotonNombre = button.querySelector(".ParrafosCambiables").textContent
        console.log(BotonNombre)
        QueHacerConObjeto(BotonNombre)
        return true
    }
    
    let accion_Pokeort = document.getElementById("accionPokeort");
    let barraDeVidaAmigo = document.getElementById("vidaAmigo");
    let opciones = document.getElementById('opciones');
    let botones = opciones.querySelectorAll('button');

    if (PokeortElegidoActual.vida <= 0) 
        {
            cambioManual = false; 
        } 
        else 
        {
            cambioManual = true; 
        }
    let TipoAnterior = PokeortElegidoActual.Tipo1

    let pokeortElegido = PokeortAmigos[index];
    let img = document.getElementById("ImagenAmiga1");
    let name = document.getElementById("pokeort-name-1");
    let nameMenu = document.getElementById("pokeort-name-menu");

    name.textContent = pokeortElegido.nombre;
    nameMenu.textContent = pokeortElegido.nombre;
    img.style.display = "block";
    img.src = pokeortElegido.src_gif_back;

    PokeortElegidoActual = pokeortElegido;
    bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);

    console.log("PokeORT elegido:", PokeortElegidoActual);
    
    document.querySelectorAll(".pokeort-cambiable").forEach(button => {
        button.style.display = "block";
    });
    button.style.display = "none";
    

    
    if (cambioManual) 
    {
        realizarTurnoEnemigo(TipoAnterior);
        setTimeout(() => {
            accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
            botones.forEach(boton => {
                boton.disabled = false;
                boton.style.opacity = '1'
            });
        }, 6000)
    }
    else 
    {
        document.getElementById("pokeort1").style.opacity = '1';
    }

    ocultarTodo();
}

// BATALLA
function AdministrarBatalla(button) {
    let accion_Pokeort = document.getElementById("accionPokeort");
    let opciones = document.getElementById('opciones');
    let botones = opciones.querySelectorAll('button');
    
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

        setTimeout(() => {
            if (realizarTurnoEnemigo()) return;
            setTimeout(() => {
                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                botones.forEach(boton => {
                    boton.disabled = false;
                    boton.style.opacity = '1'
                });
            }, 6000)
        }, 6000); 

    } else if (PokeortElegidoActual.velocidad < PokeortElegidoEnemigoActual.velocidad) { 

            if (realizarTurnoEnemigo()) return;

        setTimeout(() => {
            if (realizarTurnoJugador()) return;
        setTimeout(() => {
            accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
            botones.forEach(boton => {
                boton.disabled = false;
                boton.style.opacity = '1'
            });
        }, 6000)
        }, 6000);


    } else {
        const Aleatorio = Math.floor(Math.random() * 2) + 1;
        if (Aleatorio === 1) {

            if (realizarTurnoJugador()) return; 

        setTimeout(() => {
            if (realizarTurnoEnemigo()) return;
            setTimeout(() => {
                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                botones.forEach(boton => {
                    boton.disabled = false;
                    boton.style.opacity = '1'
                });
        }, 6000)
        }, 6000); 


        } else if (Aleatorio === 2) { 

                if (realizarTurnoEnemigo()) return;
    
            setTimeout(() => {
                if (realizarTurnoJugador()) return; 
                setTimeout(() => {
                    accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                    botones.forEach(boton => {
                        boton.disabled = false;
                        boton.style.opacity = '1'
                    });
                }, 6000)
            }, 6000); 
        }

    }
}

function bajarPokeball() {
    const vidasAmigas = [
        document.getElementById("pokebolaAmiga1"),
        document.getElementById("pokebolaAmiga2"),
        document.getElementById("pokebolaAmiga3")
    ]

    const vidasEnemigas = [
        document.getElementById("pokebolaEnemiga1"),
        document.getElementById("pokebolaEnemiga2"),
        document.getElementById("pokebolaEnemiga3")
    ]
    
    for (let i = 0; i < PokeortAmigosDerrotados.length; i++)
    {
        vidasAmigas[i].style.backgroundImage = "url('../recursos/img/iconos/pokeball-gris.png')";
    }
    for (let i = 0; i < PokeortEnemigosDerrotados.length; i++) 
    {
        vidasEnemigas[i].style.backgroundImage = "url('../recursos/img/iconos/pokeball-gris.png')";
    }
}

function bajarBarraDeVida(defensor, barraDeVida) {

    let vida = defensor.vida;
    let vidaTotal = defensor.vida_total;
    let porcentajeDeVida = (vida / vidaTotal) * 100;

    barraDeVida.style.width = `${porcentajeDeVida}%`;
}

function accionPokeort(atacante, defensor, daño, tipoAtaque) {
    let opciones = document.getElementById('opciones');
    let botones = opciones.querySelectorAll('button');
    let barraDeVidaEnemigo = document.getElementById("vidaEnemigo");
    let barraDeVidaAmigo = document.getElementById("vidaAmigo");
    let accionPokeort = document.getElementById("accionPokeort");

        accionPokeort.textContent = `¡${atacante.nombre} ataca a ${defensor.nombre} con un ataque de tipo ${tipoAtaque}, causando ${daño} de daño!`;
        botones.forEach(boton => {
            boton.disabled = true;
            boton.style.opacity = '0.8'
        });

        setTimeout(() => {
            accionPokeort.textContent = `${defensor.nombre} tiene ahora ${defensor.vida} de vida.`;
            bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);
            bajarBarraDeVida(PokeortElegidoEnemigoActual, barraDeVidaEnemigo);

            if (defensor.vida <= 0) {
                setTimeout(() => {
                    accionPokeort.textContent = `${defensor.nombre} ha sido derrotado.`;
                }, 2000);
            }
        }, 2000);
}

function realizarTurnoJugador() {
    let barraDeVidaEnemigo = document.getElementById("vidaEnemigo");
    let opciones = document.getElementById('opciones');
    let botones = opciones.querySelectorAll('button');
    let accion_Pokeort = document.getElementById("accionPokeort");
    let imgAmiga = document.getElementById("ImagenAmiga1");
    let imgEnemiga = document.getElementById("ImagenAmiga2");

    imgAmiga.src = PokeortElegidoActual.src_atk_back;

    const daño = CalcularDaño(PokeortElegidoActual, PokeortElegidoEnemigoActual, TipoDeAtaque);

    PokeortElegidoEnemigoActual.vida -= daño;
    

    ocultarTodo();
    accionPokeort(PokeortElegidoActual, PokeortElegidoEnemigoActual, daño, TipoDeAtaque);

    if (PokeortElegidoEnemigoActual.vida <= 0) {
        PokeortElegidoEnemigoActual.vida = 0;
    }

    console.log( `¡${PokeortElegidoActual.nombre} ataca a ${PokeortElegidoEnemigoActual.nombre} con un ataque de tipo ${TipoDeAtaque}, causando ${daño} de daño!`);
    console.log(`${PokeortElegidoEnemigoActual.nombre} tiene ahora ${PokeortElegidoEnemigoActual.vida} de vida.`);

    setTimeout(() => {
        if (PokeortElegidoEnemigoActual.vida <= 0)
        {
            imgEnemiga.src = PokeortElegidoEnemigoActual.src;
            imgEnemiga.style.display = "none";

                setTimeout(() => {
                    imgEnemiga.style.display = "block";
                        setTimeout(() => {
                            imgEnemiga.style.display = "none";
                                setTimeout(() => {
                                    imgEnemiga.style.display = "block";
                                        setTimeout(() => {
                                            imgEnemiga.style.display = "none";
                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            
        }
    }, 4000);

    setTimeout(() => {
        if (PokeortElegidoEnemigoActual.vida <= 0) {
            document.getElementById("ImagenAmiga2").style.display = "none";
            PokeortEnemigosDerrotados.push(PokeortElegidoEnemigoActual.nombre)
            bajarPokeball()
            accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
            botones.forEach(boton => {
                boton.disabled = false;
                boton.style.opacity = '1'
            });

            valorEnemigo = valorEnemigo + 1;
            
            if (valorEnemigo === 3) 
            {
                alert("Ganaste");
    
                const elementos = document.body.querySelectorAll("*");
                elementos.forEach(elemento => {
                    elemento.style.display = "none";
                });
            }
            const PokeortElegidoEnemigo = PokeortEnemigos[valorEnemigo];
            PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
            document.getElementById("ImagenAmiga2").src = PokeortElegidoEnemigoActual.src_gif;
            document.getElementById("ImagenAmiga2").style.display = "block";
            document.getElementById("pokeort-name-2").innerHTML = PokeortElegidoEnemigoActual.nombre;

            bajarBarraDeVida(PokeortElegidoEnemigoActual, barraDeVidaEnemigo);
        }
        imgAmiga.src = PokeortElegidoActual.src_gif_back;
    }, 6000)

    if (PokeortElegidoEnemigoActual.vida <= 0) {
        return true;
    }
    else
    {
        return false;
    }
}


function realizarTurnoEnemigo(TipoAnterior) {
    let opciones = document.getElementById('opciones');
    let botones = opciones.querySelectorAll('button');
    let accion_Pokeort = document.getElementById("accionPokeort");
    let imgAmiga = document.getElementById("ImagenAmiga2");
    let imgEnemiga = document.getElementById("ImagenAmiga1");

    if(TipoAnterior) 
    {
        TipoDefensor = TipoAnterior
    }
    else 
    {
        TipoDefensor = PokeortElegidoActual.Tipo1;
    }
    const ElementoMasEfectivo = elegirAtaqueMasEfectivo(TipoDefensor);

    const daño = CalcularDaño(PokeortElegidoEnemigoActual, PokeortElegidoActual, ElementoMasEfectivo);

    imgAmiga.src = PokeortElegidoEnemigoActual.src_atk;
    PokeortElegidoActual.vida -= daño;

    ocultarTodo();
    accionPokeort(PokeortElegidoEnemigoActual, PokeortElegidoActual, daño, ElementoMasEfectivo);

    if (PokeortElegidoActual.vida <= 0) {
        PokeortElegidoActual.vida = 0;
    }

    console.log( `¡${PokeortElegidoEnemigoActual.nombre} ataca a ${PokeortElegidoActual.nombre} con un ataque de tipo ${ElementoMasEfectivo}, causando ${daño} de daño!`);
    console.log(`${PokeortElegidoActual.nombre} tiene ahora ${PokeortElegidoActual.vida} de vida.`);

    setTimeout(() => {
        if (PokeortElegidoActual.vida <= 0)
        {
            imgEnemiga.src = PokeortElegidoActual.src_back;
            imgEnemiga.style.display = "none"

                setTimeout(() => {
                    imgEnemiga.style.display = "block";
                        setTimeout(() => {
                            imgEnemiga.style.display = "none";
                                setTimeout(() => {
                                    imgEnemiga.style.display = "block";
                                        setTimeout(() => {
                                            imgEnemiga.style.display = "none";
                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            
        }
    }, 4000);

    setTimeout(() => {
        if (PokeortElegidoActual.vida <= 0) {
            cambioManual = false
            PokeortAmigosDerrotados.push(PokeortElegidoActual.nombre);
            bajarPokeball();
            document.getElementById("pokeort1").style.opacity = '0';

            mostrar_pokeort();
            accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
            botones.forEach(boton => {
                boton.disabled = false;
                boton.style.opacity = '1'
            });
    
            document.querySelectorAll(".pokeort-cambiable").forEach(button => {
                const parrafo = button.querySelector(".ParrafosCambiables").textContent.trim();
                if (parrafo === PokeortElegidoActual.nombre) 
                {
                    button.style.display = "none"
                    button.disabled = true;
                    button.style.opacity = "0.5";
                }
                
            });
    
            document.getElementById("ImagenAmiga1").style.display = "none";
    
            valorJugador = valorJugador + 1;
            if (valorJugador === 3) 
            {
                alert("Perdiste");
                const elementos = document.body.querySelectorAll("*");
                elementos.forEach(elemento => {
                    elemento.style.display = "none";
                });
            }
        }

        imgAmiga.src = PokeortElegidoEnemigoActual.src_gif;
    }, 6000)

    if (PokeortElegidoActual.vida <= 0) {
        return true;
    }
    else {
        return false;
    }

}

function CalcularDaño(atacante, defensor, TipoDeAtaque) {
    let daño = Math.abs(atacante.atk - (defensor.defensa) / 2);
    const modificador = efectividadTipos[TipoDeAtaque][defensor.Tipo1] || 1;

    daño = daño * modificador;

    const ProbabilidadDecritico = generarNumeroAleatorio()
    let critico = ""
    if (ProbabilidadDecritico === 10)
    {
        daño = daño*2
        critico = "ES UN ATAQUE CRITICO Y"
    }
    console.log("El ataque de " + TipoDeAtaque + critico + " tiene una efectividad del: *" + modificador + " en " + defensor.Tipo1);
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

function generarNumeroAleatorio() 
{
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
}

function Objetos(PocionDeQue) 
{
    QueHacePocion = PocionDeQue
    SeleccionandoObjeto = true 
    mostrar_pokeort()
    document.querySelectorAll(".option").forEach(option => {
        option.disabled = true;
    });
}

function  QueHacerConObjeto(Nombre)
{
    if(QueHacePocion === 1)
    {
        const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
        console.log(pokeortElegido.vida)
        pokeortElegido.vida += 300;
        console.log(pokeortElegido.vida)
        if(pokeortElegido.vida > pokeortElegido.vida_total)
        {
            pokeortElegido.vida = pokeortElegido.vida_total
        }
        document.getElementById("PocionDeVida").style.display = "none"
        MostrarObjetos()
    }
    else if(QueHacePocion === 2)
        {
            const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
            console.log(pokeortElegido.atk)
            pokeortElegido.atk += 200;
            console.log(pokeortElegido.atk)
            document.getElementById("PocionDeAtaque").style.display = "none"
            MostrarObjetos()
        }
    else if(QueHacePocion === 3)
    {
                const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
                console.log(pokeortElegido.defensa)
                pokeortElegido.defensa += 200;
                console.log(pokeortElegido.defensa)
                document.getElementById("PocionDeDefensa").style.display = "none"
                MostrarObjetos()
    }
    else if(QueHacePocion === 4)
    {
                    const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
                    console.log(pokeortElegido.velocidad)
                    pokeortElegido.velocidad += 200;
                    console.log(pokeortElegido.velocidad)
                    document.getElementById("PocionDeVelocidad").style.display = "none"
                    MostrarObjetos()
    }
    else if(QueHacePocion === 5)
        {
            [PokeortAmigos, PokeortEnemigos] = [PokeortEnemigos, PokeortAmigos];
        
            const PokeortElegidoActualcopia = PokeortElegidoActual;
            const PokeortElegidoEnemigoActualcopia = PokeortElegidoEnemigoActual;
            PokeortElegidoActual = PokeortElegidoEnemigoActualcopia;
            PokeortElegidoEnemigoActual = PokeortElegidoActualcopia;
            
            console.log("PokeortAmigos después de la inversión:", PokeortAmigos);
            console.log("PokeortEnemigos después de la inversión:", PokeortEnemigos);
        
            // Actualizar los botones con las nuevas imágenes y nombres
            PokeortAmigos.forEach((pokeort, index) => {
                const img = botones[index].querySelector(".ImagenesCambiables");
                img.src = pokeort.src;  // Cambia la imagen del Pokeort
                
                const parrafo = botones[index].querySelector(".ParrafosCambiables");
                parrafo.textContent = pokeort.nombre;  // Cambia el nombre del Pokeort
        
                // Oculta el botón si el nombre coincide con PokeortElegidoId
                if (pokeort.nombre === PokeortElegidoId) {
                    botones[index].style.display = "none";
                } else {
                    botones[index].style.display = "block"; // Asegura que los demás botones estén visibles
                }
            });
        
            // Ocultar la poción misteriosa y mostrar los objetos de nuevo
            document.getElementById("PocionMisteriosa").style.display = "none";
            MostrarObjetos();  // Asumo que esta función actualiza otros elementos visuales relacionados con objetos
        }
        
}