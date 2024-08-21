window.onload = function()  
{
    let PokeORTS = JSON.parse(sessionStorage.getItem('PokeORTS'));
    let Pokeort1 = JSON.parse(sessionStorage.getItem('Pokeort1'));
    let Pokeort2 = JSON.parse(sessionStorage.getItem('Pokeort2'));
    let Pokeort3 = JSON.parse(sessionStorage.getItem('Pokeort3'));
    
    const imageninicial = document.getElementById("ImagenAmiga1");
    imageninicial.src = "" 
    let imagen1 = document.getElementById("EleccionPrimerPokemon");
    imagen1.src = Pokeort1.src; 
    let imagen2 = document.getElementById("EleccionPrimerPokemon2");
    imagen2.src = Pokeort2.src; 
    let imagen3 = document.getElementById("EleccionPrimerPokemon3");
    imagen3.src = Pokeort3.src; 
   
}
let botonesNoSeleccionados = []
let PokeortelegidoCombate
let pokeortSeleccionado 
function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
    
}

function mostrar_pokeort() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
}



function EleccionDePokeortInicial(button) 
{
    const ImagenDePokemon = button.querySelector(".ImagenCombate").src;
 document.getElementById("ImagenAmiga1").src = ImagenDePokemon;
    
 
 botonesNoSeleccionados = [];

document.querySelectorAll(".BotonDeEleciion").forEach(function(element) {
    element.style.display = "none"
     if (element !== button) {
        
         botonesNoSeleccionados.push(element);
     }
 });
 const ImagenElegida1 = document.getElementById("ImagenSeleccion") 
 const ImagenElegida2 =  document.getElementById("ImagenSeleccion2")
 const parrafo1 = document.getElementById("paarrafo")
 const parrafo2 = document.getElementById("paarrafo2")

 ImagenElegida1.src = botonesNoSeleccionados[0].src

 }


 
    