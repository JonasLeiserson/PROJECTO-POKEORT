let Pokeort1 = null;
let Pokeort2 = null;
let Pokeort3 = null;
let PokeORTS = null;
let PokeortEnemigo1 = null;
let PokeortEnemigo2 = null;
let PokeortEnemigo3 = null;



window.onload = function() {
    fetch('http://localhost:3000/leer-datos')
    .then(response => response.json())
    .then(data => {
        
        if (!data.Pokeort1 || !data.Pokeort2 || !data.Pokeort3) {
            console.error('Error: Datos incompletos recibidos del servidor.');
            alert('Error: Datos incompletos recibidos del servidor.');
            return;
        }


        Pokeort1 = data.Pokeort1;
        Pokeort2 = data.Pokeort2;
        Pokeort3 = data.Pokeort3;
        PokeORTS = data.PokeORTS;
        PokeortEnemigo1 = data.PokeortEnemigo1;
        PokeortEnemigo2 =  data.PokeortEnemigo2;
        PokeortEnemigo3 =  data.PokeortEnemigo3;

        
        console.log('Datos recibidos:', data);
        console.log('Pokeort1:', Pokeort1);
        console.log('Pokeort2:', Pokeort2);
        console.log('Pokeort3:', Pokeort3);
        console.log('PokeORTS:', PokeORTS);
        console.log('PokeORTS:', PokeortEnemigo1);
        console.log('PokeORTS:', PokeortEnemigo2);
        console.log('PokeORTS:', PokeortEnemigo3);
        


        for (let key in PokeORTS) {
            if (PokeORTS.hasOwnProperty(key)) {
                console.log(`${key}:`, PokeORTS[key]);
            }
        }


        if (!Pokeort1.src) {
            alert("Error: Pokeort1 is not correctly loaded.");
            return;
        }
        if (!Pokeort2.src) {
            alert("Error: Pokeort2 is not correctly loaded.");
            return;
        }
        if (!Pokeort3.src) {
            alert("Error: Pokeort3 is not correctly loaded.");
            return;
        }

        document.getElementById("ImagenAmiga1").src = Pokeort1.src;
        document.getElementById("EleccionPrimerPokemon").src = Pokeort1.src;
        document.getElementById("EleccionPrimerPokemon2").src = Pokeort2.src;
        document.getElementById("EleccionPrimerPokemon3").src = Pokeort3.src;

        document.getElementById("ImagenAmiga2").src = PokeortEnemigo1.src; 
        document.getElementById("ImagenAmiga2") .style.display = "none";  
        window.pokeortsData = { Pokeort1, Pokeort2, Pokeort3 };
    })
    .catch(error => {
        console.error('Error al cargar los datos del servidor:', error);
        alert('Error al cargar los datos del servidor.');
    });
};



let botonesNoSeleccionados = [];
let PokeortelegidoCombate = []; 
let botonSeleccionado = null;
let daño;

function mostrar_ataques() {
    document.getElementById("ataques").style.display = "flex";
    document.getElementById("cambiar-pokeort").style.display = "none";
}

function mostrar_pokeort() {
    document.getElementById("ataques").style.display = "none";
    document.getElementById("cambiar-pokeort").style.display = "flex";
}

function EleccionDePokeortInicial(button) {

    const ImagenDePokemon = button.querySelector(".ImagenCombate").src;

    document.getElementById("ImagenAmiga2") .style.display = "block";  
    document.getElementById("ImagenAmiga1").src = ImagenDePokemon;
    
    botonSeleccionado = butt9665<on.id;
    
    botonesNoSeleccionados = [];
    PokeortelegidoCombate.push(button)
   
    document.querySelectorAll(".BotonDeEleciion").forEach(function(element) {
        element.style.display = "none";
        if (element !== button) 
        {
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

function Rendirse() {
    alert("Te rendiste");
}

function CalcularDaño(botonSeleccionado) {
    if (!Pokeort1) 
    {
        alert("Error: Pokeort1 no está definido.");
        return;
    }
    console.log(botonSeleccionado);

}