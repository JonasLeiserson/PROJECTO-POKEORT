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

// Ruta para leer los datos
app.get('/leer-datos', (req, res) => {
    fs.readFile('DatosPokeorts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al leer los datos');
        }
        res.send(data);  // Devolver los datos leídos al cliente
    });
});

// Ruta para guardar y actualizar los datos
app.post('/guardar-datos', (req, res) => {
    fs.readFile('DatosPokeorts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al leer los datos existentes');
        }
        
        let datosExistentes = JSON.parse(data);
        const nuevosDatos = req.body;

        // Actualizar los datos existentes con los nuevos
        datosExistentes.Pokeort1 = nuevosDatos.Pokeort1 || datosExistentes.Pokeort1;
        datosExistentes.Pokeort2 = nuevosDatos.Pokeort2 || datosExistentes.Pokeort2;
        datosExistentes.Pokeort3 = nuevosDatos.Pokeort3 || datosExistentes.Pokeort3;
        datosExistentes.PokeortEnemigo1 = nuevosDatos.PokeortEnemigo1 || datosExistentes.PokeortEnemigo1;
        datosExistentes.PokeortEnemigo2 = nuevosDatos.PokeortEnemigo2 || datosExistentes.PokeortEnemigo2;
        datosExistentes.PokeortEnemigo3 = nuevosDatos.PokeortEnemigo3 || datosExistentes.PokeortEnemigo3;

        // Escribir los datos actualizados en el archivo
        fs.writeFile('DatosPokeorts.json', JSON.stringify(datosExistentes, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).send('Error al guardar los datos');
            }

            res.status(200).send('Datos guardados correctamente');
        });
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
