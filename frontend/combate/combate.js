// variables
let PokeortAmigos = [];
let PokeortEnemigos = [];
let PokeortElegidoActual;
let PokeortElegidoEnemigoActual;
let PokeortAmigosDerrotados = [];
let PokeortEnemigosDerrotados = [];
let PokeortelegidoCombate = null;
let botonSeleccionado = null;
let botonSeleccionadoID = "";
let turnoJugador = true;
let MedirVelocidad;
let valorEnemigo = 0;
let valorJugador = 0
let cambioManual = true;
let SeleccionandoObjeto = false;
let QueHacePocion = 0
let botones = [
    document.getElementById("BotonDeCambio1"),
    document.getElementById("BotonDeCambio2"),
    document.getElementById("BotonDeCambio3")
];
let ataqueElegidoAmigo;
let ataqueElegidoEnemigo;
let mejorAtaque = null; 
let acertado;
let PokeortElegidoActualEstado;
let PokeortElegidoEnemigoActualEstado;

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
        document.getElementById("spoiler").src = PokeortEnemigos[0].src

        document.getElementById("ImagenAmiga2").style.display = "none";
    });
};

// cosas para front
let opciones = document.getElementById('opciones');
let botones_opciones = opciones.querySelectorAll('button');
let accion_Pokeort = document.getElementById("accionPokeort");
let imgAmiga = document.getElementById("ImagenAmiga1");
let imgEnemiga = document.getElementById("ImagenAmiga2");
let tiposPokeortElegido = [
    document.getElementById("pokeortAmigo-tipo1"),
    document.getElementById("pokeortAmigo-tipo2")
]
let tiposPokeortElegidoEnemigo = [
    document.getElementById("pokeortEnemigo-tipo1"),
    document.getElementById("pokeortEnemigo-tipo2")
]
let barraDeVidaAmigo = document.getElementById("vidaAmigo");
let barraDeVidaEnemigo = document.getElementById("vidaEnemigo");
let ataques = [
    document.getElementById("ataque1"),
    document.getElementById("ataque2"),
    document.getElementById("ataque3"),
    document.getElementById("ataque4")
];
let pokeortElegidoNombre = document.getElementById("pokeort-name-1");
let pokeortEnemigoNombre = document.getElementById("pokeort-name-2");
let nameMenu = document.getElementById("pokeort-name-menu");

// TABLA DE TIPOS
const efectividadTipos = {
    agua: { fuego: 2, planta: 0.5, electrico: 1, agua: 1, roca: 2, normal: 1, tierra: 2, hielo: 1, volador: 1, oscuridad: 1, skibidi: 1, especial: 1},
    fuego: { agua: 0.5, planta: 2, electrico: 1, fuego: 1, roca: 0.5, normal: 1, tierra: 0.5, hielo: 2, volador: 1, oscuridad: 1, skibidi: 1, especial: 1},
    planta: { agua: 2, fuego: 0.5, electrico: 1, planta: 0.5, roca: 2, normal: 1, tierra: 2, hielo: 1, volador: 1, oscuridad: 1, skibidi: 1, especial: 1},
    electrico: { agua: 2, planta: 0.5, fuego: 1, electrico: 1, roca: 0.5, normal: 1, tierra: 0.5, hielo: 1, volador: 2, oscuridad: 1, skibidi: 1, especial: 1},
    roca: { agua: 0.5, planta: 1, fuego: 2, electrico: 2, roca: 1, normal: 1, tierra: 1, hielo: 1, volador: 2, oscuridad: 0.5, skibidi: 1, especial: 1},
    normal: { fuego: 1, planta: 1, electrico: 1, agua: 1, roca: 0.5, normal: 1, tierra: 1, hielo: 1, volador: 1, oscuridad: 0.5, skibidi: 1, especial: 1},
    tierra: { fuego: 2, planta: 0.5, electrico: 2, agua: 1, roca: 2, normal: 1, tierra: 1, hielo: 1, volador: 0, oscuridad: 1, skibidi: 1, especial: 1},
    hielo: { fuego: 0.5, planta: 2, electrico: 1, agua: 0.5, roca: 1, normal: 1, tierra: 2, hielo: 0.5, volador: 2, oscuridad: 1, skibidi: 1, especial: 1},
    volador: { fuego: 1, planta: 2, electrico: 0.5, agua: 1, roca: 0.5, normal: 1, tierra: 2, hielo: 1, volador: 1, oscuridad: 1, skibidi: 1, especial: 1},
    oscuridad: { fuego: 1, planta: 1, electrico: 2, agua: 1, roca: 1, normal: 1, tierra: 1, hielo: 1, volador: 2, oscuridad: 0.5, skibidi: 1, especial: 1},
    skibidi: { fuego: 100, planta: 100, electrico: 100, agua: 100, roca: 100, normal: 100, tierra: 100, hielo: 100, volador: 100, oscuridad: 100, skibidi: 1, especial: 1},
    especial: { fuego: 2, planta: 2, electrico: 2, agua: 2, roca: 2, normal: 2, tierra: 2, hielo: 2, volador: 2, oscuridad: 2, skibidi: 2, especial: 2}
};

// funciones front

function cambiarAtaques(pokeort) {
    ataques[0].textContent = pokeort.ataques[0].nombre;
    ataques[1].textContent = pokeort.ataques[1].nombre;
    ataques[2].textContent = pokeort.ataques[2].nombre;
    ataques[3].textContent = pokeort.ataques[3].nombre;
}

function ataqueAnimacion(img) {
    img.style.width = "188%";
    img.style.height = "184%";
    img.style.position = "relative";
    img.style.bottom = "45%";
    img.style.right = "44%";
}

function terminarAtaqueAnimacion(img) {
    img.style.width = "94%";
    img.style.height = "92%";
    img.style.bottom = "0";
    img.style.right = "0";
}

function habilitarOpciones() {
    botones_opciones.forEach(boton => {
        boton.disabled = false;
        boton.style.opacity = '1'
    });
}

function desabilitarOpciones() {
    botones_opciones.forEach(boton => {
        boton.disabled = true;
        boton.style.opacity = '0.8'
    });
}

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

// funciones combate

function EleccionDePokeortInicial(button) {
    const PokeortElegidoId = button.querySelector(".ParrafoDeNombre").textContent.trim();
    const pokeortElegido = PokeortAmigos.find(pokeort => pokeort.nombre === PokeortElegidoId);
    const PokeortElegidoEnemigo = PokeortEnemigos[0];

    PokeortElegidoActual = pokeortElegido;
    console.log("PokeORT elegido:", PokeortElegidoActual);

    PokeortElegidoEnemigoActual = PokeortElegidoEnemigo;
    console.log("PokeORT enemigo elegido:", PokeortElegidoEnemigoActual);

    nameMenu.innerHTML = pokeortElegido.nombre;
    pokeortElegidoNombre.innerHTML = pokeortElegido.nombre;
    imgAmiga.src = pokeortElegido.src_gif_back;
    imgEnemiga.style.display = "block";
    imgEnemiga.src = PokeortElegidoEnemigoActual.src_gif;
    pokeortEnemigoNombre.innerHTML = PokeortElegidoEnemigoActual.nombre;
    tiposPokeortElegido[0].src = `../recursos/img/iconos/tipos/${pokeortElegido.Tipo1}.png`
    tiposPokeortElegido[1].src = `../recursos/img/iconos/tipos/${pokeortElegido.Tipo2}.png`
    tiposPokeortElegidoEnemigo[0].src = `../recursos/img/iconos/tipos/${PokeortElegidoEnemigoActual.Tipo1}.png`
    tiposPokeortElegidoEnemigo[1].src = `../recursos/img/iconos/tipos/${PokeortElegidoEnemigoActual.Tipo2}.png`
    cambiarAtaques(PokeortElegidoActual)

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

    imgAmiga.style.display = "block";
}

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
    let TipoAnterior1 = PokeortElegidoActual.Tipo1
    let TipoAnterior2 = PokeortElegidoActual.Tipo2

    let pokeortElegido = PokeortAmigos[index];

    pokeortElegidoNombre.textContent = pokeortElegido.nombre;
    nameMenu.textContent = pokeortElegido.nombre;
    imgAmiga.style.display = "block";
    imgAmiga.src = pokeortElegido.src_gif_back;
    tiposPokeortElegido[0].src = `../recursos/img/iconos/tipos/${pokeortElegido.Tipo1}.png`
    tiposPokeortElegido[1].src = `../recursos/img/iconos/tipos/${pokeortElegido.Tipo2}.png`
    PokeortElegidoActual = pokeortElegido;
    cambiarAtaques(PokeortElegidoActual)
    bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);

    console.log("PokeORT elegido:", PokeortElegidoActual);
    
    document.querySelectorAll(".pokeort-cambiable").forEach(button => {
        button.style.display = "block";
    });
    button.style.display = "none";
    
    if (cambioManual) 
    {
        realizarTurnoEnemigo(TipoAnterior1, TipoAnterior2);
        setTimeout(() => {
            accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
            habilitarOpciones();
        }, 6000)
    }
    else 
    {
        document.getElementById("pokeort1").style.opacity = '1';
        habilitarOpciones()
    }

    ocultarTodo();
}

// BATALLA
function AdministrarBatalla(button) {
        const ataque = button.textContent.trim(); 

        if (ataque === ataques[0].textContent.trim()) {
            ataqueElegidoAmigo = PokeortElegidoActual.ataques[0];
        } else if (ataque === ataques[1].textContent.trim()) {
            ataqueElegidoAmigo = PokeortElegidoActual.ataques[1];
        } else if (ataque === ataques[2].textContent.trim()) {
            ataqueElegidoAmigo = PokeortElegidoActual.ataques[2];
        } else if (ataque === ataques[3].textContent.trim()) {
            ataqueElegidoAmigo = PokeortElegidoActual.ataques[3];
        }


    if (PokeortElegidoActual.velocidad > PokeortElegidoEnemigoActual.velocidad) 
    {
        if (realizarTurnoJugador()) return; 
        if (acertado)
        {
            setTimeout(() => {
                if (realizarTurnoEnemigo()) return;
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {

                                setTimeout(() => {
                                    accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                    habilitarOpciones()
                                }, 4000)
                        }
                }
                else {
                        setTimeout(() => {
                            accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                            habilitarOpciones()
                        }, 6000)
                }
                }, 4000); 
        }
        else
        {
            setTimeout(() => {
                if (realizarTurnoEnemigo()) return;
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 6000); 
        }
    }
    else if (PokeortElegidoActual.velocidad < PokeortElegidoEnemigoActual.velocidad) 
    { 
        if (realizarTurnoEnemigo()) return;
        if (acertado)
        {
            setTimeout(() => {
                if (realizarTurnoJugador()) return; 
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 4000); 
        }
        else
        {
            setTimeout(() => {
                if (realizarTurnoEnemigo()) return;
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 6000); 
        }
    } 
    else 
    {
        const Aleatorio = Math.floor(Math.random() * 2) + 1;
        if (Aleatorio === 1) {
if (realizarTurnoJugador()) return; 
        if (acertado)
        {
            setTimeout(() => {
                if (realizarTurnoEnemigo()) return;
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 4000); 
        }
        else
        {
            setTimeout(() => {
                if (realizarTurnoEnemigo()) return;
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 6000); 
        }
    } 
    else if (Aleatorio === 2) 
    {
        if (realizarTurnoEnemigo()) return;
        if (acertado)
        {
            setTimeout(() => {
                if (realizarTurnoJugador()) return; 
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 4000); 
        }
        else
        {
            setTimeout(() => {
                if (realizarTurnoEnemigo()) return;
                if (acertado)
                {
                    if (PokeortElegidoActual.vida <= 0)
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 6000)
                        }
                        else
                        {
                            setTimeout(() => {
                                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                                habilitarOpciones()
                            }, 4000)
                        }
                }
                else {
                    setTimeout(() => {
                        accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                        habilitarOpciones()
                    }, 6000)
                }
                }, 6000); 
        }
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

function accionPokeort(atacante, defensor, daño, ataque) {
    if (acertado)
    {
        accion_Pokeort.textContent = `¡${atacante.nombre} ataca a ${defensor.nombre} con ${ataque.nombre}, causando ${daño} de daño!`;
        desabilitarOpciones()

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
    else
    {
        accion_Pokeort.textContent = `¡${atacante.nombre} ataca a ${defensor.nombre} con ${ataque.nombre}!`;
        desabilitarOpciones()

        setTimeout(() => {
        accion_Pokeort.textContent = `¡${atacante.nombre} ha fallado el ataque ${ataque.nombre}!`

            bajarBarraDeVida(PokeortElegidoActual, barraDeVidaAmigo);
            bajarBarraDeVida(PokeortElegidoEnemigoActual, barraDeVidaEnemigo);

                setTimeout(() => {
                    accion_Pokeort.textContent = `${defensor.nombre} se mantiene con ${defensor.vida} de vida.`;
                }, 2000);
        }, 2000);
    }  
}

function realizarTurnoJugador() {
    imgAmiga.src = PokeortElegidoActual.src_atk_back;
    
    setTimeout(() => {
        ataqueAnimacion(imgAmiga)
    }, 10);

    if (pokeortAcierta(ataqueElegidoAmigo))
    {
        acertado = true;
        const daño = CalcularDaño(PokeortElegidoActual, PokeortElegidoEnemigoActual, ataqueElegidoAmigo);

        PokeortElegidoEnemigoActual.vida -= daño;
        
    
        ocultarTodo();
        accionPokeort(PokeortElegidoActual, PokeortElegidoEnemigoActual, daño, ataqueElegidoAmigo);
    
        if (PokeortElegidoEnemigoActual.vida <= 0) {
            PokeortElegidoEnemigoActual.vida = 0;
        }
    
        console.log( `¡${PokeortElegidoActual.nombre} ataca a ${PokeortElegidoEnemigoActual.nombre} con ${ataqueElegidoAmigo.nombre}, causando ${daño} de daño!`);
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
    

            if (PokeortElegidoEnemigoActual.vida <= 0) {
                setTimeout(() => {
                document.getElementById("ImagenAmiga2").style.display = "none";
                PokeortEnemigosDerrotados.push(PokeortElegidoEnemigoActual.nombre)
                bajarPokeball()
                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                habilitarOpciones()
    
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
                pokeortEnemigoNombre.innerHTML = PokeortElegidoEnemigoActual.nombre;
                tiposPokeortElegidoEnemigo[0].src = `../recursos/img/iconos/tipos/${PokeortElegidoEnemigoActual.Tipo1}.png`
                tiposPokeortElegidoEnemigo[1].src = `../recursos/img/iconos/tipos/${PokeortElegidoEnemigoActual.Tipo2}.png`
    
                bajarBarraDeVida(PokeortElegidoEnemigoActual, barraDeVidaEnemigo);
                imgAmiga.src = PokeortElegidoActual.src_gif_back;
                terminarAtaqueAnimacion(imgAmiga)
            }, 6000)
            }
            else
            {
                setTimeout(() => {
                    imgAmiga.src = PokeortElegidoActual.src_gif_back;
                    terminarAtaqueAnimacion(imgAmiga)
                }, 4000);
            }

    }
    else
    {
        acertado = false;
        console.log(`¡${PokeortElegidoActual.nombre} ha fallado el ataque ${ataqueElegidoAmigo.nombre}!`)
        ocultarTodo();
        accionPokeort(PokeortElegidoActual, PokeortElegidoEnemigoActual, 0, ataqueElegidoAmigo)

        setTimeout(() => {
            imgAmiga.src = PokeortElegidoActual.src_gif_back;
            terminarAtaqueAnimacion(imgAmiga)
        }, 4000)
    }

    

    if (PokeortElegidoEnemigoActual.vida <= 0) {
        return true;
    }
    else
    {
        return false;
    }
}


function realizarTurnoEnemigo(TipoAnterior1, TipoAnterior2) {
    
    if(TipoAnterior1) 
    {
        TipoDefensor1 = TipoAnterior1
    }
    else 
    {
        TipoDefensor1 = PokeortElegidoActual.Tipo1;
    }

    if (TipoAnterior2)
    {
        TipoDefensor2 = TipoAnterior2
    }
    else
    {
        TipoDefensor2 = PokeortElegidoActual.Tipo2;
    }
    
    const AtaqueMasEfectivo = elegirAtaqueMasEfectivo(TipoDefensor1, TipoDefensor2);

    const daño = CalcularDaño(PokeortElegidoEnemigoActual, PokeortElegidoActual, AtaqueMasEfectivo);

    ataqueElegidoEnemigo = AtaqueMasEfectivo;

    imgEnemiga.src = PokeortElegidoEnemigoActual.src_atk;

    setTimeout(() => {
        ataqueAnimacion(imgEnemiga, PokeortElegidoEnemigoActual)
    }, 10);

    if (pokeortAcierta(ataqueElegidoEnemigo))
    {
        acertado = true;
        PokeortElegidoActual.vida -= daño;

        ocultarTodo();
        accionPokeort(PokeortElegidoEnemigoActual, PokeortElegidoActual, daño, AtaqueMasEfectivo);
    
        if (PokeortElegidoActual.vida <= 0) {
            PokeortElegidoActual.vida = 0;
        }
        
        console.log( `¡${PokeortElegidoEnemigoActual.nombre} ataca a ${PokeortElegidoActual.nombre} con ${ataqueElegidoEnemigo.nombre}, causando ${daño} de daño!`);
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
    
            if (PokeortElegidoActual.vida <= 0) {
                setTimeout(() => {
                cambioManual = false
                PokeortAmigosDerrotados.push(PokeortElegidoActual.nombre);
                bajarPokeball();
                document.getElementById("pokeort1").style.opacity = '0';
    
                mostrar_pokeort();
                accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                desabilitarOpciones()
        
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
                imgEnemiga.src = PokeortElegidoEnemigoActual.src_gif;
                terminarAtaqueAnimacion(imgEnemiga)
            }, 6000)
            }
            else
            {
                setTimeout(() => {
                    imgEnemiga.src = PokeortElegidoEnemigoActual.src_gif;
                    terminarAtaqueAnimacion(imgEnemiga)
            }, 4000)
            }
    }
    else
    {
        acertado = false;
        console.log(`¡${PokeortElegidoActual.nombre} ha fallado el ataque ${ataqueElegidoEnemigo.nombre}!`)
        ocultarTodo();
        accionPokeort(PokeortElegidoEnemigoActual ,PokeortElegidoActual , 0, AtaqueMasEfectivo);

        setTimeout(() => {
            imgEnemiga.src = PokeortElegidoEnemigoActual.src_gif;
            terminarAtaqueAnimacion(imgEnemiga)
        }, 4000)
    }

    if (PokeortElegidoActual.vida <= 0) {
        return true;
    }
    else {
        return false;
    }

}

function CalcularDaño(atacante, defensor, ataque) {
    const modificador1 = efectividadTipos[ataque.tipo][defensor.Tipo1];
    const modificador2 = efectividadTipos[ataque.tipo][defensor.Tipo2];

    let modificadorTotal = modificador1 * modificador2;
    let variacion = Math.floor(Math.random() * (100 - 85 + 1)) + 85;
    let daño = Math.round(0.01 * modificadorTotal * variacion * (21 * atacante.atk * ataque.potencia / (25 * defensor.defensa) + 2));

    const ProbabilidadDecritico = generarNumeroAleatorio()
    let critico = ""
    if (ProbabilidadDecritico === 10)
    {
        daño = daño * 2
        critico = " ES UN ATAQUE CRITICO Y"
    }
    console.log("El ataque de " + ataque.tipo + critico + " tiene una efectividad del: *" + modificador1 * modificador2 + " en " + defensor.Tipo1 + " y " + defensor.Tipo2);
    return daño;
    
}

function elegirAtaqueMasEfectivo(TipoDefensor1, TipoDefensor2) {   
    let mejorEfectividad = 0; 

    let tiposAtaquesDisponibles = PokeortElegidoEnemigoActual.ataques;

    tiposAtaquesDisponibles.forEach(ataque => {

        const efectividad1 = efectividadTipos[ataque.tipo][TipoDefensor1] || 1;
        const efectividad2 = efectividadTipos[ataque.tipo][TipoDefensor2] || 1;

        const efectividadTotal = efectividad1 * efectividad2;

        if (efectividadTotal > mejorEfectividad) {
            mejorEfectividad = efectividadTotal;
            mejorAtaque = ataque;
        }
    });

    return mejorAtaque; 
}

function pokeortAcierta(ataque) {
    let porcentajeAcierto = ataque.precision * 0.01;
    let random = Math.random();

    if (random < porcentajeAcierto)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function mostrarTabla() {
    document.getElementById("tabladetipos-div").style.display="flex";
}

function cerrarTabla() {
    document.getElementById("tabladetipos-div").style.display="none";
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
    desabilitarOpciones();
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
            accion_Pokeort.textContent = `¡${pokeort.nombre} bebió una pocion de ${pociones[pocionIndex]}!`;
            setTimeout(() => {
                accion_Pokeort.textContent = `¡${pociones[pocionIndex]} de ${pokeort.nombre} aumentó +${cambioEstadistica}!`;
                setTimeout(() => {
                    accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                    habilitarOpciones()
                }, 2000)
            }, 2000)
        }
        else
        {
            desabilitarOpciones()
            accion_Pokeort.textContent = "¡Cambiaste los PokeORTs con el rival!"
            setTimeout(() => {
                accion_Pokeort.textContent = `Tus PokeORT actuales son: ${PokeortAmigos[0].nombre}, ${PokeortAmigos[1].nombre} y ${PokeortAmigos[2].nombre}`;
                setTimeout(() => {
                    accion_Pokeort.innerHTML = `¿Que deberia hacer <span id='pokeort-name-menu'>${PokeortElegidoActual.nombre}</span>?`;
                    habilitarOpciones()
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
            pokeortEnemigoNombre.textContent = PokeortElegidoActual.nombre;
            cambiarAtaques(PokeortElegidoActual)
            tiposPokeortElegido[0].src = `../recursos/img/iconos/tipos/${PokeortElegidoActual.Tipo1}.png`
            tiposPokeortElegido[1].src = `../recursos/img/iconos/tipos/${PokeortElegidoActual.Tipo2}.png`
            tiposPokeortElegidoEnemigo[0].src = `../recursos/img/iconos/tipos/${PokeortElegidoEnemigoActual.Tipo1}.png`
            tiposPokeortElegidoEnemigo[1].src = `../recursos/img/iconos/tipos/${PokeortElegidoEnemigoActual.Tipo2}.png`
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