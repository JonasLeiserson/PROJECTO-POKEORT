const PICKCHEL = {
    nombre: "PICKCHEL",
    atk: 100,
    vida: 200,
    velocidad: 300,
    defensa: 200,
    Tipo1: "ELECTRICO",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
};

const OWLEON = {
    nombre: "OWLEON",
    atk: 200,
    vida: 150,
    velocidad: 200,
    defensa: 200,
    Tipo1: "FUEGO",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
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
    Habilidad3: 1
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
    Habilidad3: 1
};

const MELONKEY = {
    nombre: "MELONKEY",
    atk: 150,
    vida: 180,
    velocidad: 250,
    defensa: 200,
    Tipo1: "AGUA",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
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
    Habilidad3: 1
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
    Habilidad3: 1
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
    Habilidad3: 1
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
    "COMODIN": COMODIN
};
let PokeortListoParaElCombate
let PokeortListoParaElCombate2
let BotonOculto = null;
let Eleccion = 1
let PokeortSeleccionado1 = 0
let PokeortSeleccionado2 = 0

<<<<<<< HEAD
function cambiarpokeort(button) 
  {
    const pokeortId = button.querySelector('.pokeort-name').textContent.trim();
    const pokeort = PokeORTS[pokeortId];
    const selectedPokeortDisplay = document.getElementById('selected-pokeort-display');
=======
function BloquearPokeort(button)

{
    const pokeort = PokeORTS[COMODIN]; 
    if(Eleccion === 1)
    
{
    if( PokeortSeleccionado1 === 1) 
>>>>>>> 6ad4811315ca280cc8fd70172c5e2042ae0823ae

    {
<<<<<<< HEAD
        const imgSrc = button.querySelector('img').src;

        selectedPokeortDisplay.src = imgSrc;
        selectedPokeortDisplay.style.display = "block";

        document.getElementById("Pokeort").innerHTML = pokeort.nombre;

        
        button.style.display = "none";
    } 
    else 
=======
    document.getElementById("BotonDeBloqueo1").innerHTML = "DesbloquearBoton";
    const BotonBloqueo = document.getElementById("BotonDeBloqueo1")
    const elementos = document.querySelectorAll(`.selected-pokeort-1`);
        elementos.forEach(elemento => 
>>>>>>> 6ad4811315ca280cc8fd70172c5e2042ae0823ae
    {
     elemento.style.backgroundColor = "rgba(0, 255, 0, 0.799)";
     });
     Eleccion = 2;
    BotonBloqueo.style.display = "none"
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
    if( PokeortSeleccionado2 === 1) 

        {
        document.getElementById("BotonDeBloqueo2").innerHTML = "DesbloquearBoton";
        const BotonBloqueo2 = document.getElementById("BotonDeBloqueo2")
        const elementos = document.querySelectorAll(`.selected-pokeort-2`);
            elementos.forEach(elemento => 
        {
         elemento.style.backgroundColor = "rgba(0, 255, 0, 0.799)";
            Eleccion = 3;
            BotonOculto = "null";
         });
         BotonBloqueo2.style.display ="none"
         const OcultarBotones = document.querySelectorAll(`.pokeort-container`);
         OcultarBotones.forEach(OcultarBotones => 
            {
            OcultarBotones.style.display = "none"
            });
       
        }
        else
        {
        alert("Selecciona un Pokeort Primero")
        }
}
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
    PokeortSeleccionado1 = 1
     PokeortListoParaElCombate = pokeort
    }
    else if(Eleccion === 2)
    {
    document.getElementById("Pokeort2").innerHTML = pokeort.nombre; 
    document.getElementById("selected-pokeort-display2").src = POkeortImg;
    document.getElementById("selected-pokeort-display2").style.display = "block"; 
    PokeortSeleccionado2 = 1
     PokeortListoParaElCombate2 = pokeort
    }
    if(BotonOculto)
    {
        BotonOculto.style.display = "block";
    }
    
    button.style.display = "none";
    BotonOculto = button;
    
}

function MostrarEstadisticas(button) 
{
<<<<<<< HEAD
    const pokeortId = button.querySelector('.pokeort-name').textContent.trim();
    const pokeort = PokeORTS[pokeortId];

    if (pokeort) 
    {
   
        document.getElementById("VIDA").textContent = "VIDA: " + pokeort.vida;
        document.getElementById("VELOCIDAD").textContent = "VELOCIDAD: " + pokeort.velocidad;
        document.getElementById("DAÑO").textContent = "DAÑO: " + pokeort.atk;
        document.getElementById("DEFENSA").textContent = "DEFENSA: " + pokeort.defensa;



       
    } else {
        console.error("PokeORT no encontrado:", pokeortId);
    }
}
function DevolverPokeort(slot) 
{
    const selectedPokeortDisplay = document.getElementById(`selected-pokeort-display}`);



    selectedPokeortDisplay.style.display = "none";
    selectedPokeortDisplay.src = "";

    
    document.querySelectorAll('.pokeort-container button').forEach((btn) =>
     {
            btn.style.display = "inline-block";
        
    });

   
    document.getElementById("Pokeort").innerHTML = "PokeORT";
=======
    const PokeortIds = button.querySelector(".pokeort-name").textContent.trim(); 
    const pokeort = PokeORTS[PokeortIds]; 
>>>>>>> 6ad4811315ca280cc8fd70172c5e2042ae0823ae

    document.getElementById("VIDA").textContent = "VIDA: " + pokeort.vida;
    document.getElementById("VELOCIDAD").textContent = "VELOCIDAD: " + pokeort.velocidad;
    document.getElementById("DAÑO").textContent = "DAÑO: " + pokeort.atk;
    document.getElementById("DEFENSA").textContent = "DEFENSA: " + pokeort.defensa;
}


