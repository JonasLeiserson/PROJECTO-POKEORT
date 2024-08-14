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

const PokeORTS = {
    "Owleon": OWLEON,
    "Melonkey": MELONKEY,
    "Roktom": ROKTOM,
    "Pickchel": PICKCHEL,
    "Macetonio": MACETONIO,
    "GatoRancio": GATORANCIO,
    "AmonGus": AMONGUS,
    "ChanchoRancio": CHANCHORANCIO
};

function cambiarpokeort(button, slot) 
  {
    const pokeortId = button.querySelector('.pokeort-name').textContent.trim();
    const pokeort = PokeORTS[pokeortId];
    const selectedPokeortDisplay = document.getElementById('selected-pokeort-display-${slot}');

    if (pokeort) 
    {
        const imgSrc = button.querySelector('img').src;

        selectedPokeortDisplay.src = imgSrc;
        selectedPokeortDisplay.style.display = "block";

        document.getElementById("Pokeort${slot}").innerHTML = pokeort.nombre;

        
        button.style.display = "none";
    } 
    else 
    {
        console.error("PokeORT no encontrado:", pokeortId);
    }
}


function MostrarEstadisticas(button) 
{
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
    const selectedPokeortDisplay = document.getElementById(`selected-pokeort-display-${slot}`);



    selectedPokeortDisplay.style.display = "none";
    selectedPokeortDisplay.src = "";

    
    document.querySelectorAll('.pokeort-container button').forEach((btn) =>
     {
            btn.style.display = "inline-block";
        
    });

   
    document.getElementById("Pokeort${slot}").innerHTML = "PokeORT  ${slot}";

}



