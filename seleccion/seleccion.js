var PICKCHEL = 
{
    nombre: "PICKCHEL",
    atk: 100,
    vida: 200,
    velocidad: 300,
    Tipo1: "ELECTRICO",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
};

var OWLEON = {
    nombre: "OWLEON",
    atk: 200,
    vida: 150,
    velocidad: 200,
    Tipo1: "FUEGO",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
};

var ROKTOM = {
    nombre: "ROKTOM",
    atk: 200,
    vida: 400,
    velocidad: 100,
    Tipo1: "ROCA",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
};

var MACETONIO = {
    nombre: "MACETONIO",
    atk: 200,
    vida: 400,
    velocidad: 100,
    Tipo1: "PLANTA",
    Habilidad1: 1,
    Habilidad2: 1,
    Habilidad3: 1
};
var PokeORTS = {
    "Owleon": OWLEON,
    "Melonkey": Melonkey,
    "Roktom": ROKTOM,
    "Pickchel": PICKCHEL,
    "Macetonio": MACETONIO
};


//FALTA MELONKEY PIPA

function cambiarpokeort(button) 
{
button.style.display = "none" ; 
const imgSrc = button.querySelector('img').src;
const selectedPokeortDisplay = document.getElementById('selected-pokeort-display');
selectedPokeortDisplay.src = imgSrc;
}

function MostrarEstadisticas(button) {
    const pokeortId = button.querySelector('.pokeort-name').textContent;
    const pokeort = PokeORTS[pokeortId];

    document.getElementById("VIDA").textContent = "VIDA: " + pokeort.vida;
    document.getElementById("VELOCIDAD").textContent = "VELOCIDAD: " + pokeort.velocidad;
    document.getElementById("DANO").textContent = "DAÑO: " + pokeort.atk;
    document.getElementById("DEFENSA").textContent = "DEFENSA: " + (pokeort.defensa); 
}