const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors({
    origin: '*', 
    credentials: false 
}));

app.use(bodyParser.json());

app.get('/leer-datos', (res) => {
    fs.readFile('DatosPokeorts.json', 'utf8', (data) => {
        res.send(data);
    });
});

app.post('/guardar-datos', (req, res) => {
    fs.readFile('DatosPokeorts.json', 'utf8', (data) => {
        let datosExistentes = JSON.parse(data);
        const nuevosDatos = req.body;

        
        datosExistentes.Pokeort1 = nuevosDatos.Pokeort1 || datosExistentes.Pokeort1;
        datosExistentes.Pokeort2 = nuevosDatos.Pokeort2 || datosExistentes.Pokeort2;
        datosExistentes.Pokeort3 = nuevosDatos.Pokeort3 || datosExistentes.Pokeort3;
        datosExistentes.PokeortEnemigo1 = nuevosDatos.PokeortEnemigo1 || datosExistentes.PokeortEnemigo1;
        datosExistentes.PokeortEnemigo2 = nuevosDatos.PokeortEnemigo2 || datosExistentes.PokeortEnemigo2;
        datosExistentes.PokeortEnemigo3 = nuevosDatos.PokeortEnemigo3 || datosExistentes.PokeortEnemigo3;

    
        fs.writeFile('DatosPokeorts.json', JSON.stringify(datosExistentes, null, 2), (err) => {
            res.send('Datos guardados con éxito.');
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
