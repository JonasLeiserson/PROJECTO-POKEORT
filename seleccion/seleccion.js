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

const PokeORTS = {
    "Owleon": OWLEON,
    "Melonkey": MELONKEY,
    "Roktom": ROKTOM,
    "Pickchel": PICKCHEL,
    "Macetonio": MACETONIO
};

function cambiarpokeort(button) {
    button.style.display = "none"; 
    const imgSrc = button.querySelector('img').src;
    const selectedPokeortDisplay = document.getElementById('selected-pokeort-display');
    selectedPokeortDisplay.src = imgSrc;
    document.getElementById("Pokeort1").innerHTML = pokeort.nombre;
}

function MostrarEstadisticas(button) {
    const pokeortId = button.querySelector('.pokeort-name').textContent.trim();
    var pokeort = PokeORTS[pokeortId];

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
