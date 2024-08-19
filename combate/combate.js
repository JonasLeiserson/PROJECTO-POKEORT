window.onload = function()  
{
    const Pokeort1 = JSON.parse(sessionStorage.getItem('Pokeort1'));
    const Pokeort2 = JSON.parse(sessionStorage.getItem('Pokeort2'));
    const Pokeort3 = JSON.parse(sessionStorage.getItem('Pokeort3'));
    
    const imageninicial = document.getElementById("ImagenAmiga1");
    imageninicial.src = "none" 
    const imagen1 = document.getElementById("EleccionPrimerPokemon");
    imagen1.src = Pokeort1.src; 
    const imagen2 = document.getElementById("EleccionPrimerPokemon2");
    imagen2.src = Pokeort2.src; 
    const imagen3 = document.getElementById("EleccionPrimerPokemon3");
    imagen3.src = Pokeort3.src; 


    const NombrePokeort = document.getElementById("NombrePokeort").innerHTML = Pokeort1.nombre;
  
    const NombrePokeort2 = document.getElementById("NombrePokeort2").innerHTML  = Pokeort2.nombre;
  
    const NombrePokeort3 = document.getElementById("NombrePokeort3").innerHTML  = Pokeort3.nombre;
   

}

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
document.getElementById("ImagenAmiga1").src = ImagenDePokemon
}