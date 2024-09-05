let Pokeort1 
let Pokeort2
let Pokeort3
let PokeORTS

window.onload = function()
{
    fetch('http://localhost:3000/leer-datos')
    .then(response => response.json())
    .then(data => {
        
        Pokeort1 = data.Pokeort1;
        Pokeort2 = data.Pokeort2;
        Pokeort3 = data.Pokeort3;
        PokeORTS = data.PokeORTS;

        console.log('Pokeort1:', Pokeort1);
        console.log('Pokeort2:', Pokeort2);
        console.log('Pokeort3:', Pokeort3);

        for (let key in PokeORTS) {
            if (PokeORTS.hasOwnProperty(key)) {
                console.log(`${key}:`, PokeORTS[key]);
            }
        }

        if (!Pokeort1 || !Pokeort1.src) {
            alert("Error: Pokeort1 is not correctly loaded.");
            return;
        }
        if (!Pokeort2 || !Pokeort2.src) {
            alert("Error: Pokeort2 is not correctly loaded.");
            return;
        }
        if (!Pokeort3 || !Pokeort3.src) {
            alert("Error: Pokeort3 is not correctly loaded.");
            return;
        }

       
        document.getElementById("ImagenAmiga1").src = Pokeort1.src;
        document.getElementById("EleccionPrimerPokemon").src = Pokeort1.src;
        document.getElementById("EleccionPrimerPokemon2").src = Pokeort2.src;
        document.getElementById("EleccionPrimerPokemon3").src = Pokeort3.src;

       
        window.pokeortsData = { Pokeort1, Pokeort2, Pokeort3 };
    })
    .catch(error => {
        console.error('Error al cargar los datos del servidor:', error);
    });
};


let botonesNoSeleccionados = []
let PokeortelegidoCombate;  
let botonSeleccionado = "";
let daño;


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
    
     botonSeleccionado  = button
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

function CalcularDaño() 
{
alert(Pokeort1)

}