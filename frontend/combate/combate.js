
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
let botones = [
    document.getElementById("BotonDeCambio1"),
    document.getElementById("BotonDeCambio2"),
    document.getElementById("BotonDeCambio3")
];

//cosas para front
let opciones = document.getElementById('opciones');
let botones_opciones = opciones.querySelectorAll('button');
let accion_Pokeort = document.getElementById("accionPokeort");
let imgAmiga = document.getElementById("ImagenAmiga1");
let imgEnemiga = document.getElementById("ImagenAmiga2");
let barraDeVidaAmigo = document.getElementById("vidaAmigo");
let barraDeVidaEnemigo = document.getElementById("vidaEnemigo");
let ataques = [
    document.getElementById("ataque1"),
    document.getElementById("ataque2"),
    document.getElementById("ataque3"),
    document.getElementById("ataque4")
];


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

    ataques[0].textContent = PokeortElegidoActual.ataques[0].nombre;
    ataques[1].textContent = PokeortElegidoActual.ataques[1].nombre;
    ataques[2].textContent = PokeortElegidoActual.ataques[2].nombre;
    ataques[3].textContent = PokeortElegidoActual.ataques[3].nombre;

    let AtaquesDePokeortActual = PokeortElegidoActual.ataques[0];
    let ataques = 
    {
        ataque1: new Ataque(AtaquesDePokeortActual.nombre, AtaquesDePokeortActual.potencia, AtaquesDePokeortActual.precision, AtaquesDePokeortActual.tipo),
        ataque2: new Ataque(PokeortElegidoActual.ataques[1].nombre, 25),
        ataque3: new Ataque(PokeortElegidoActual.ataques[2].nombre, ),
        ataque4: new Ataque(PokeortElegidoActual.ataques[3].nombre, 40),
    };
    console.log(ataques)
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
    ataques[0].textContent = PokeortElegidoActual.ataques[0].nombre;
    ataques[1].textContent = PokeortElegidoActual.ataques[1].nombre;
    ataques[2].textContent = PokeortElegidoActual.ataques[2].nombre;
    ataques[3].textContent = PokeortElegidoActual.ataques[3].nombre;
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
            botones_opciones.forEach(boton => {
                boton.disabled = false;
                boton.style.opacity = '1'
            });
        }, 6000)
    }
    else 
    {
        document.getElementById("pokeort1").style.opacity = '1';
        botones_opciones.forEach(boton => {
            boton.disabled = false;
            boton.style.opacity = '1';
        })
    }

    ocultarTodo();
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

        setTimeout(() => {
            if (realizarTurnoEnemigo()) return;
            setTimeout(() => {
                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                botones_opciones.forEach(boton => {
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
            botones_opciones.forEach(boton => {
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
                botones_opciones.forEach(boton => {
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
                    botones_opciones.forEach(boton => {
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

    if (PokeortAmigosDerrotados.length === 0)
    {
        vidasAmigas.forEach(vida => {
            vida.style.backgroundImage = "url('../recursos/img/iconos/pokeball-roja.png'"
        })
    }

    if (PokeortEnemigosDerrotados.length === 0)
        {
            vidasEnemigas.forEach(vida => {
                vida.style.backgroundImage = "url('../recursos/img/iconos/pokeball-roja.png'"
            })
        }
}

function bajarBarraDeVida(defensor, barraDeVida) {

    let vida = defensor.vida;
    let vidaTotal = defensor.vida_total;
    let porcentajeDeVida = (vida / vidaTotal) * 100;

    barraDeVida.style.width = `${porcentajeDeVida}%`;
}

function accionPokeort(atacante, defensor, daño, tipoAtaque) {
        accion_Pokeort.textContent = `¡${atacante.nombre} ataca a ${defensor.nombre} con un ataque de tipo ${tipoAtaque}, causando ${daño} de daño!`;
        botones_opciones.forEach(boton => {
            boton.disabled = true;
            boton.style.opacity = '0.8'
        });

        setTimeout(() => {
            accion_Pokeort.textContent = `${defensor.nombre} tiene ahora ${defensor.vida} de vida.`;
            bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);
            bajarBarraDeVida(PokeortElegidoEnemigoActual, barraDeVidaEnemigo);

            if (defensor.vida <= 0) {
                setTimeout(() => {
                    accion_Pokeort.textContent = `${defensor.nombre} ha sido derrotado.`;
                }, 2000);
            }
        }, 2000);
}

function realizarTurnoJugador() {
    imgAmiga.src = PokeortElegidoActual.src_atk_back;
    
    setTimeout(() => {
        imgAmiga.style.width = "188%";
        imgAmiga.style.height = "184%";
        imgAmiga.style.position = "relative";
        imgAmiga.style.bottom = "45%";
        imgAmiga.style.right = "44%";
    }, 10);


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
            botones_opciones.forEach(boton => {
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
        imgAmiga.style.width = "94%";
        imgAmiga.style.height = "92%";
        imgAmiga.style.bottom = "0";
        imgAmiga.style.right = "0";
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

    imgEnemiga.src = PokeortElegidoEnemigoActual.src_atk;

    setTimeout(() => {
    imgEnemiga.style.width = "188%";
    imgEnemiga.style.height = "182%";
    imgEnemiga.style.position = "relative";
    imgEnemiga.style.bottom = "45%";
    imgEnemiga.style.right = "44%";
    }, 10);

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
            imgAmiga.src = PokeortElegidoActual.src_back;
            imgAmiga.style.display = "none"

                setTimeout(() => {
                    imgAmiga.style.display = "block";
                        setTimeout(() => {
                            imgAmiga.style.display = "none";
                                setTimeout(() => {
                                    imgAmiga.style.display = "block";
                                        setTimeout(() => {
                                            imgAmiga.style.display = "none";
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
            botones_opciones.forEach(boton => {
                boton.disabled = true;
                boton.style.opacity = '0.8'
            });
    
            document.querySelectorAll(".pokeort-cambiable").forEach(button => {
                const parrafo = button.querySelector(".ParrafosCambiables").textContent.trim();
                if (parrafo === PokeortElegidoActual.nombre) 
                {
                    button.style.display = "none";
                    button.disabled = true;
                    button.style.opacity = "0.5";
                }
                
            });
    
            imgAmiga.style.display = "none";
    
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

        imgEnemiga.src = PokeortElegidoEnemigoActual.src_gif;
        imgEnemiga.style.width = "94%";
        imgEnemiga.style.height = "92%";
        imgEnemiga.style.bottom = "0";
        imgEnemiga.style.right = "0";
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
//POCIONES
function  QueHacerConObjeto(Nombre)
{
    const pociones = [
        'VIDA',
        'DAÑO',
        'DEFENSA',
        'VELOCIDAD',
        'ESPECIAL'
    ]

    let pocionIndex = QueHacePocion - 1;

    function pokeortBebePocion(pokeort, cambioEstadistica) {
        ocultarTodo();

        if (QueHacePocion <= 4)
        {
            accion_Pokeort.textContent = `${pokeort.nombre} bebió una pocion de ${pociones[pocionIndex]}!`;
            setTimeout(() => {
                accion_Pokeort.textContent = `${pociones[pocionIndex]} de ${pokeort.nombre} aumentó +${cambioEstadistica}!`;
                setTimeout(() => {
                    accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                    botones_opciones.forEach(boton => boton.disabled = false);
                }, 2000)
            }, 2000)
        }
        else
        {
            accion_Pokeort.textContent = "¡Cambiaste los PokeORTs con el rival!"
            setTimeout(() => {
                accion_Pokeort.textContent = `Tus PokeORT actuales son: ${PokeortAmigos[0].nombre}, ${PokeortAmigos[1].nombre} y ${PokeortAmigos[2].nombre}`;
                setTimeout(() => {
                    accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                    botones_opciones.forEach(boton => boton.disabled = false);
                }, 2000)
            }, 2000)
        }
    }

    if (QueHacePocion === 1)
    {
        const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
        console.log(pokeortElegido.vida)
        pokeortElegido.vida += 300;
        console.log(pokeortElegido.vida)
        if(pokeortElegido.vida > pokeortElegido.vida_total)
        {
            pokeortElegido.vida = pokeortElegido.vida_total
            console.log(pokeortElegido.vida)
        }
        document.getElementById("PocionDeVida").style.display = "none"
        MostrarObjetos()
        bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);
        pokeortBebePocion(pokeortElegido, 300);
    }
    else if(QueHacePocion === 2)
        {
            const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
            console.log(pokeortElegido.atk)
            pokeortElegido.atk += 200;
            console.log(pokeortElegido.atk)
            document.getElementById("PocionDeAtaque").style.display = "none"
            MostrarObjetos()
            pokeortBebePocion(pokeortElegido, 200)
        }
    else if(QueHacePocion === 3)
    {
                const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
                console.log(pokeortElegido.defensa)
                pokeortElegido.defensa += 200;
                console.log(pokeortElegido.defensa)
                document.getElementById("PocionDeDefensa").style.display = "none"
                MostrarObjetos()
                pokeortBebePocion(pokeortElegido, 200)
    }
    else if(QueHacePocion === 4)
    {
                    const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === Nombre);
                    console.log(pokeortElegido.velocidad)
                    pokeortElegido.velocidad += 200;
                    console.log(pokeortElegido.velocidad)
                    document.getElementById("PocionDeVelocidad").style.display = "none"
                    MostrarObjetos()
                    pokeortBebePocion(pokeortElegido, 200)
    }
    else if(QueHacePocion === 5)
        {
            [PokeortAmigos, PokeortEnemigos] = [PokeortEnemigos, PokeortAmigos];
            [PokeortAmigosDerrotados, PokeortEnemigosDerrotados] = [PokeortEnemigosDerrotados, PokeortAmigosDerrotados]
        
            const PokeortElegidoActualcopia = PokeortElegidoActual;
            const PokeortElegidoEnemigoActualcopia = PokeortElegidoEnemigoActual;
            
            PokeortElegidoActual = PokeortElegidoEnemigoActualcopia;
            PokeortElegidoEnemigoActual = PokeortElegidoActualcopia;
            
            console.log("PokeortAmigos después de la inversión:", PokeortAmigos);
            console.log("PokeortEnemigos después de la inversión:", PokeortEnemigos);

            PokeortAmigos.forEach((pokeort, index) => {
                const img = botones[index].querySelector(".ImagenesCambiables");
                img.src = pokeort.src;  
                
                const parrafo = botones[index].querySelector(".ParrafosCambiables");
                parrafo.textContent = pokeort.nombre; 
                
                    botones[index].style.display = "block"; 
            });       
            imgAmiga.src = PokeortElegidoActual.src_gif_back;
            imgEnemiga.src = PokeortElegidoEnemigoActual.src_gif;
            document.getElementById("pokeort-name-1").textContent = PokeortElegidoActual.nombre;
            document.getElementById("pokeort-name-2").textContent = PokeortElegidoActual.nombre;
            ataques[0].textContent = PokeortElegidoActual.ataques[0].nombre;
            ataques[1].textContent = PokeortElegidoActual.ataques[1].nombre;
            ataques[2].textContent = PokeortElegidoActual.ataques[2].nombre;
            ataques[3].textContent = PokeortElegidoActual.ataques[3].nombre;
            bajarPokeball();
            bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);
            bajarBarraDeVida(PokeortElegidoEnemigoActual, barraDeVidaEnemigo);
        
            MostrarObjetos();  
            document.getElementById("PocionMisteriosa").style.display = "none";
            pokeortBebePocion(PokeortElegidoActual, 0);
        }

        SeleccionandoObjeto = false;
}

function PocionInsana()
{
    QueHacePocion = 5 
    QueHacerConObjeto()
}

class Ataque {
    constructor(nombre, potencia, precision, tipo) {
        this.nombre = nombre;
        this.potencia = potencia;
        this.precision = precision;
        this.tipo = tipo;
    }
}
