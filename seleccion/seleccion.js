
const OWLEON = {
    nombre: "OWLEON",
    atk: 200,
    vida: 150,
    velocidad: 200,
    defensa: 200,
    Tipo1: "FUEGO",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1,
    src:"../recursos/img/owleon.png",
    NumeroSecreto: 1
}
const MELONKEY = {
    nombre: "MELONKEY",
    atk: 150,
    vida: 180,
    velocidad: 250,
    defensa: 200,
    Tipo1: "AGUA",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1,
    src:"../recursos/img/melonkey.png",
    NumeroSecreto: 2
};

const ROKTOM = {
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
};
const PICKCHEL = {
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
};
const AMONGUS = {
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
};

const CHANCHORANCIO  = {
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
};
const GATORANCIO = {
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
};
const MACETONIO = {
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
};

const CARITAFACHA = {
    nombre: "CARITA-FACHA",
    atk: 200,
    vida: 400,
    velocidad: 100,
    defensa: 200,
    Tipo1: "PLANTA",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1,
    src:"../recursos/img/carita facha.png",
    NumeroSecreto: 9
};
const SKIBIDI = {
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
    
};

const COMODIN = {
    nombre: "COMODIN",
    atk: 150,
    vida: 180,
    velocidad: 250,
    defensa: 200,
    Tipo1: "POLLO",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
};

const PokeORTS = {
    "Owleon": OWLEON,
    "Melonkey": MELONKEY,
    "Roktom": ROKTOM,
    "Pickchel": PICKCHEL,
    "Macetonio": MACETONIO,
    "GatoRancio": GATORANCIO,
    "AmonGus": AMONGUS,
    "ChanchoRancio": CHANCHORANCIO,
    "CaritaFacha": CARITAFACHA,
    "Skibidi": SKIBIDI, 
    "COMODIN": COMODIN
};
let PokeortListoParaElCombate 
let PokeortListoParaElCombate2
let PokeortListoParaElCombate3
let BotonOculto = null;
let Eleccion = 1
let Contraseña = ""
let Pokeortelegido1 
let Pokeortelegido2 
<<<<<<< HEAD
let Pokeortelegido3

=======
let Pokeortelegido3 
>>>>>>> fcff84760b58e6429151280cc621c39b3e182633

function BloquearPokeort(button)
{
    const pokeort = PokeORTS[COMODIN]; 
    if(Eleccion === 1)
    
{
    if (Pokeortelegido1 !== "PokeORT 1") 

    {
    const BotonBloqueo1 = document.getElementById("BotonDeBloqueo1")
    const BotonBloqueo2 = document.getElementById("BotonDeBloqueo2")
    const elementos = document.querySelectorAll(`.selected-pokeort-1`);
        elementos.forEach(elemento => 
    {
     elemento.style.backgroundColor = "rgba(0, 255, 0, 0.799)";
     });
     Eleccion = 2;
    BotonBloqueo1.style.display = "none"
    BotonBloqueo2.style.display = "block"
    BotonOculto = "null"
    BotonOculto = pokeort
    }
    else
    {
    alert("Selecciona un Pokeort Primero")
    }
}
else 
{
    if( Pokeortelegido2 !== "PokeORT 2") 

        {
            
        
        const BotonBloqueo2 = document.getElementById("BotonDeBloqueo2")
        const BotonBloqueo3 = document.getElementById("BotonDeBloqueo3")
        const elementos = document.querySelectorAll(`.selected-pokeort-2`);

            elementos.forEach(elemento => 
        {
         elemento.style.backgroundColor = "rgba(0, 255, 0, 0.799)";
            Eleccion = 3;
            BotonOculto = "null";
            BotonOculto = pokeort
         });
<<<<<<< HEAD
         BotonBloqueo2.style.display ="none"
         BotonBloqueo3.style.display ="block"
         
=======

         BotonBloqueo2.style.display = "none"
         BotonBloqueo3.style.display = "block"
       
        }
        else
        {
        alert("Selecciona un Pokeort primero")
        }
}
else
{
    if( Pokeortelegido2 !== "PokeORT 2") 
    {
        const BotonBloqueo3 = document.getElementById("BotonDeBloqueo3")
        const elementos = document.querySelectorAll(`.selected-pokeort-3`);
    
        elementos.forEach(elemento => 
            {
             elemento.style.backgroundColor = "rgba(0, 255, 0, 0.799)";
             });
    
        BotonBloqueo3.style.display = "none"

        const OcultarBotones = document.querySelectorAll(`.pokeort-container`);
         OcultarBotones.forEach(OcultarBotones =>
            {
            OcultarBotones.style.display = "none"
            });
       
>>>>>>> fcff84760b58e6429151280cc621c39b3e182633
        }
        else
        {
        alert("Selecciona un Pokeort Primero")
        }
}
<<<<<<< HEAD
    else if(Eleccion === 3)
    {
{
        if(Pokeortelegido3 !== "PokeORT 3" ) 
    {
        
            const BotonBloqueo3 = document.getElementById("BotonDeBloqueo3")
            const elementos = document.querySelectorAll(`.selected-pokeort-3`);
                elementos.forEach(elemento => 
            {
             elemento.style.backgroundColor = "rgba(0, 255, 0, 0.799)";
                Eleccion = 4;
                BotonOculto = "null";
             });
             BotonBloqueo3.style.display ="none"
             const OcultarBotones = document.querySelectorAll(`.pokeort-container`);
             OcultarBotones.forEach(OcultarBotones => 
                {
                OcultarBotones.style.display = "none"
                });  
    }
}
}
}

=======
}
>>>>>>> fcff84760b58e6429151280cc621c39b3e182633
function BotonesCombinados(button)
{
cambiarpokeort(button);
EasterEgg(button); 
}

function cambiarpokeort(button)
{
   
    const PokeortIds = button.querySelector(".pokeort-name").textContent.trim(); 
    const pokeort = PokeORTS[PokeortIds]; 
    const POkeortImg = button.querySelector(".pokeort-img").src; 
    
    if(Eleccion === 1)
    {
    document.getElementById("Pokeort1").innerHTML = pokeort.nombre; 
    document.getElementById("selected-pokeort-display").src = POkeortImg;
    document.getElementById("selected-pokeort-display").style.display = "block"; 
    PokeortListoParaElCombate = pokeort
     Pokeortelegido1 =  document.getElementById('Pokeort1').textContent;
    }

    else if(Eleccion === 2)
    {
    document.getElementById("Pokeort2").innerHTML = pokeort.nombre; 
    document.getElementById("selected-pokeort-display2").src = POkeortImg;
    document.getElementById("selected-pokeort-display2").style.display = "block"; 
     PokeortListoParaElCombate2 = pokeort
     Pokeortelegido2 =  document.getElementById('Pokeort2').textContent;
    }
<<<<<<< HEAD
    
    else if(Eleccion === 3)
    {
    document.getElementById("Pokeort3").innerHTML = pokeort.nombre; 
    document.getElementById("selected-pokeort-display3").src = POkeortImg;
    document.getElementById("selected-pokeort-display3").style.display = "block"; 
     PokeortListoParaElCombate3 = pokeort
     Pokeortelegido3 =  document.getElementById('Pokeort3').textContent;
    }
    
=======
>>>>>>> fcff84760b58e6429151280cc621c39b3e182633
    if(BotonOculto)
    {
        BotonOculto.style.display = "block";
    }
    
    button.style.display = "none";
    BotonOculto = button;
    
}

function MostrarEstadisticas(button) 
{
    const PokeortIds = button.querySelector(".pokeort-name").textContent.trim(); 
    const pokeort = PokeORTS[PokeortIds]; 

    document.getElementById("VIDA").textContent = "VIDA: " + pokeort.vida;
    document.getElementById("VELOCIDAD").textContent = "VELOCIDAD: " + pokeort.velocidad;
    document.getElementById("DAÑO").textContent = "DAÑO: " + pokeort.atk;
    document.getElementById("DEFENSA").textContent = "DEFENSA: " + pokeort.defensa;
}

function EasterEgg(button)
{

    const PokeortIds = button.querySelector(".pokeort-name").textContent.trim(); 
    const pokeort = PokeORTS[PokeortIds]; 
    Contraseña = Contraseña + pokeort.NumeroSecreto.toString();

    if(Contraseña === "1987") 
    {
        document.getElementById("kibidi").style.display = "block"
    }
    
}
function EnviarAlCombate ()
{
    if (Eleccion === 4)
    {   
        sessionStorage.setItem('PokeORTS', JSON.stringify(PokeORTS));
        sessionStorage.setItem('Pokeort1', JSON.stringify(PokeortListoParaElCombate));
        sessionStorage.setItem('Pokeort2', JSON.stringify(PokeortListoParaElCombate2));
        sessionStorage.setItem('Pokeort3', JSON.stringify(PokeortListoParaElCombate3));
        window.location.href = "../combate/combate.html";
    }   

    else
    {
        alert("Primero Selecciona 2 pokeorts")
    }
}