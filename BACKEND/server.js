const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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

app.post('/guardar-datos', (req, res) => {
    fs.writeFile('DatosPokeorts.json', JSON.stringify(req.body, null, 2), err => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).send('Error al guardar los datos.');
        } else {
            res.send('Datos guardados con éxito.');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
