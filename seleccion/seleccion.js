

const PokeORTS =   
{
     OWLEON : {
        nombre: "OWLEON",
        atk: 200,
        vida: 150,
        velocidad: 200,
        defensa: 200,
        Tipo1: "FUEGO",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/owleon.png" ,
        NumeroSecreto: 1
    },
     MELONKEY : {
        nombre: "MELONKEY",
        atk: 150,
        vida: 180,
        velocidad: 250,
        defensa: 200,
        Tipo1: "AGUA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src: "../recursos/img/melonkey.png",
        NumeroSecreto: 2
    },
    
     ROKTOM : {
        nombre: "ROKTOM",
        atk: 200,
        vida: 400,
        velocidad: 100,
        defensa: 200,
        Tipo1: "ROCA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/roktom.png" ,
        NumeroSecreto: 3
    },
     PICKCHEL : {
        nombre: "PICKCHEL",
        atk: 100,
        vida: 200,
        velocidad: 300,
        defensa: 200,
        Tipo1: "ELECTRICO",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/pickchel.png" ,
        NumeroSecreto: 4
    },
     AMONGUS : {
        nombre: "AMON GUS",
        atk: 150,
        vida: 180,
        velocidad: 250,
        defensa: 200,
        Tipo1: "AGUA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/among us.png" ,
        NumeroSecreto: 5
    },
    
     CHANCHORANCIO  : {
        nombre: "CHANCHORANCIO",
        atk: 500,
        vida: 100,
        velocidad: 250,
        defensa: 50,
        Tipo1: "AGUA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/chancho rancio.png" ,
        NumeroSecreto: 6
    },
     GATORANCIO : {
        nombre: "GATO-RANCIO",
        atk: 200,
        vida: 200,
        velocidad: 200,
        defensa: 200,
        Tipo1: "AGUA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/gato rancio.png" ,
        NumeroSecreto: 7
    },
     MACETONIO : {
        nombre: "MACETONIO",
        atk: 200,
        vida: 400,
        velocidad: 100,
        defensa: 200,
        Tipo1: "PLANTA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/maseta rancia.png" ,
        NumeroSecreto: 8
    },
    
     CARITAFACHA : {
        nombre: "CARITA-FACHA",
        atk: 200,
        vida: 400,
        velocidad: 100,
        defensa: 200,
        Tipo1: "PLANTA",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/carita fachera.png",
        NumeroSecreto: 9
    },
     SKIBIDI : {
        nombre: "SKIBIDI",
        atk: 999,
        vida: 1,
        velocidad: 200,
        defensa: 1,
        Tipo1: "TOILET",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1,
        src:"../recursos/img/skibidi.png",
        
    },
    
     COMODIN : {
        nombre: "COMODIN",
        atk: 150,
        vida: 180,
        velocidad: 250,
        defensa: 200,
        Tipo1: "POLLO",
        Habilidad1: 1,
        Habilidad2: 1,
        Habilidad3: 1
    }
};

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
}