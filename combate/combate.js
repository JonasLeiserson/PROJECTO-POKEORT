
window.onload = function()  
{
    let PokeORTS = JSON.parse(sessionStorage.getItem('PokeORTS')) || {};
    let Pokeort1 = JSON.parse(sessionStorage.getItem('Pokeort1')) || {};
    let Pokeort2 = JSON.parse(sessionStorage.getItem('Pokeort2')) || {};
    let Pokeort3 = JSON.parse(sessionStorage.getItem('Pokeort3')) || {};


    if (!Pokeort1 || !Pokeort1.src) {
        alert("Error: Pokeort1 is not correctly loaded.");
    }
    if (!Pokeort2 || !Pokeort2.src) {
        alert("Error: Pokeort2 is not correctly loaded.");
    }
    if (!Pokeort3 || !Pokeort3.src) {
        alert("Error: Pokeort3 is not correctly loaded.");
    }
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
let botonSeleccionado = ""
let daño
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

 botonSeleccionado = button
 
 botonesNoSeleccionados = [];

document.querySelectorAll(".BotonDeEleciion").forEach(function(element) {
    element.style.display = "none"
     if (element !== button) {
        
         botonesNoSeleccionados.push(element);
     }
 });
 const ImagenElegida1 = document.getElementById("ImagenSeleccion");
 const ImagenElegida2 = document.getElementById("ImagenSeleccion2");
 const parrafo1 = document.getElementById("paarrafo");
 const parrafo2 = document.getElementById("paarrafo2");

 ImagenElegida1.src = botonesNoSeleccionados[0].querySelector(".ImagenCombate").src;
 parrafo1.textContent = botonesNoSeleccionados[0].querySelector(".ParrafoDeNombre").textContent;

 ImagenElegida2.src = botonesNoSeleccionados[1].querySelector(".ImagenCombate").src;
 parrafo2.textContent = botonesNoSeleccionados[1].querySelector(".ParrafoDeNombre").textContent;

 document.querySelectorAll(".pokeort").forEach(function(element) {
    element.style.display = "block";
    });
}
function intercambiarPokeort(pokeortButton) {

    const imagenSeleccionada = pokeortButton.querySelector("img").src;
    const textoSeleccionado = pokeortButton.querySelector("p").textContent;

    pokeortButton.querySelector("img").src = botonSeleccionado.querySelector(".ImagenCombate").src;
    pokeortButton.querySelector("p").textContent = botonSeleccionado.querySelector(".ParrafoDeNombre").textContent;

    botonSeleccionado.querySelector(".ImagenCombate").src = imagenSeleccionada;
    botonSeleccionado.querySelector(".ParrafoDeNombre").textContent = textoSeleccionado;


    document.getElementById("ImagenAmiga1").src = botonSeleccionado.querySelector(".ImagenCombate").src;

}

function Rendirse() 
{
    alert("Te rendiste")
}

function CalcularDaño(Pokeort1, Pokeort2) 
{
    if (!Pokeort1 || !Pokeort2)
         {
        alert("Error: Pokeort1 or Pokeort2 is undefined.");
        console.log("Pokeort1:", Pokeort1);
        console.log("Pokeort2:", Pokeort2);
        return;
         }
 daño = Pokeort1.atk - Pokeort2.defensa
 if (daño < 0) 
    {
    daño = 0;
    }
alert(daño)
}