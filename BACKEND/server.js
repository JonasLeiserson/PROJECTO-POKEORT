const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ruta para leer los datos actuales
app.get('/leer-datos', (req, res) => {
    fs.readFile('DatosPokeorts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer los datos:', err);
            res.status(500).send('Error al leer los datos.');
        } else {
            res.send(data);
        }
    });
});

// Ruta para guardar los nuevos datos sin sobrescribir los existentes
app.post('/guardar-datos', (req, res) => {
    // Leer los datos actuales del archivo JSON
    fs.readFile('DatosPokeorts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer los datos:', err);
            return res.status(500).send('Error al leer los datos.');
        }

        // Convertir el archivo JSON a un objeto
        let datosExistentes = JSON.parse(data);

        // Obtener los nuevos datos enviados en la petición
        const nuevosDatos = req.body;

        // Combinar los nuevos datos con los existentes
        datosExistentes.Pokeort1 = nuevosDatos.Pokeort1 || datosExistentes.Pokeort1;
        datosExistentes.Pokeort2 = nuevosDatos.Pokeort2 || datosExistentes.Pokeort2;
        datosExistentes.Pokeort3 = nuevosDatos.Pokeort3 || datosExistentes.Pokeort3;
        datosExistentes.PokeortEnemigo1 = nuevosDatos.PokeortEnemigo1 || datosExistentes.PokeortEnemigo1;
        datosExistentes.PokeortEnemigo2 = nuevosDatos.PokeortEnemigo2 || datosExistentes.PokeortEnemigo2;
        datosExistentes.PokeortEnemigo3 = nuevosDatos.PokeortEnemigo3 || datosExistentes.PokeortEnemigo3;
        datosExistentes.PokeORTS = nuevosDatos.PokeORTS || datosExistentes.PokeORTS;
        
        

        // Guardar los datos combinados en el archivo JSON
        fs.writeFile('DatosPokeorts.json', JSON.stringify(datosExistentes, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar los datos:', err);
                return res.status(500).send('Error al guardar los datos.');
            }

            res.send('Datos guardados con éxito.');
        });
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
