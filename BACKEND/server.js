const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Ruta para guardar los datos en el archivo JSON
app.post('/guardar-datos', (req, res) => {
    const datos = req.body;

    fs.writeFile('datosPokeorts.json', JSON.stringify(datos, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).send('Error al guardar los datos.');
        }
        res.send('Datos guardados con éxito.');
    });
});

// Ruta para leer los datos del archivo JSON
app.get('/leer-datos', (req, res) => {
    fs.readFile('datosPokeorts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer los datos:', err);
            return res.status(500).send('Error al leer los datos.');
        }
        res.send(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});