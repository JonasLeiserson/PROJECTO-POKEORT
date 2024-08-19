window.onload = function()  
{
    const Pokeort1 = JSON.parse(sessionStorage.getItem('Pokeort1'));
    const Pokeort2 = JSON.parse(sessionStorage.getItem('Pokeort2'));
    const Pokeort3 = JSON.parse(sessionStorage.getItem('Pokeort3'));
    
    const imageninicial = document.getElementById("ImagenAmiga1");
    imageninicial.src = "none" 
    imageninicial.style.display = "none";
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

function EleccionDePokeortInicial()
{
    const pokeortsSeleccionados = [
        pokeort = document.getElementById("EleccionPrimerPokemon"),
        pokeort2 = document.getElementById("EleccionPrimerPokemon2"),
        pokeort3 = document.getElementById("EleccionPrimerPokemon3")
    ];

    const seleccion = 0;

    pokeort.addEventListener("click", seleccionar()
{
    seleccion = 1
});

pokeort2.addEventListener("click", seleccionar2()
{
    seleccion = 2
});

pokeort3.addEventListener("click", seleccionar3()
{
    seleccion = 3
});

    const imagenAmiga = document.getElementById("ImagenAmiga1").src;

    
}
