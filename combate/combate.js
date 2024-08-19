window.onload = function()  
{
    const Pokeort1 = JSON.parse(sessionStorage.getItem('Pokeort1'));
    const Pokeort2 = JSON.parse(sessionStorage.getItem('Pokeort2'));
    
    const imageninicial = document.getElementById("ImagenAmiga1");
    imageninicial.src = "none" 
    const imagen1 = document.getElementById("EleccionPrimerPokemon");
    imagen1.src = Pokeort1.src; 
    const imagen2 = document.getElementById("EleccionPrimerPokemon2");
    imagen2.src = Pokeort2.src; 
}

function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
    
}

function mostrar_pokeort() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
}

