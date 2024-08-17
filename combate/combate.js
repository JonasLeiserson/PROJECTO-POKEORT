window.onload = function()  
{
    const Pokeort1 = JSON.parse(sessionStorage.getItem('Pokeort1'));
    const Pokeort2 = JSON.parse(sessionStorage.getItem('Pokeort2'));
    
    const imagen1 = document.getElementById("ImagenAmiga1");
    imagen1.src = Pokeort1.src; 
}

function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
    
}

function mostrar_pokeort() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
}

