const fs = require('fs');
const fsp = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*', 
    credentials: false 
}));

app.use(bodyParser.json());

app.get('/leer-datos', (req, res) => 
{
    fs.readFile('DatosPokeorts.json', 'utf8', (err, data) => {
        if (err) 
    {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error al leer los datos');
    }
        res.send(data);
    });
});


app.post('/guardar-datos', async (req, res) => {
    try {
        // Leer archivo de datos
        const data = await fsp.readFile('DatosPokeorts.json', 'utf8');
        let datosExistentes = JSON.parse(data);
        const nuevosDatos = req.body;

        // Actualizar datos
        datosExistentes.Pokeort1 = nuevosDatos.Pokeort1 || datosExistentes.Pokeort1;
        datosExistentes.Pokeort2 = nuevosDatos.Pokeort2 || datosExistentes.Pokeort2;
        datosExistentes.Pokeort3 = nuevosDatos.Pokeort3 || datosExistentes.Pokeort3;
        datosExistentes.PokeortEnemigo1 = nuevosDatos.PokeortEnemigo1 || datosExistentes.PokeortEnemigo1;
        datosExistentes.PokeortEnemigo2 = nuevosDatos.PokeortEnemigo2 || datosExistentes.PokeortEnemigo2;
        datosExistentes.PokeortEnemigo3 = nuevosDatos.PokeortEnemigo3 || datosExistentes.PokeortEnemigo3;

        // Escribir datos actualizados en el archivo
        await fsp.writeFile('DatosPokeorts.json', JSON.stringify(datosExistentes, null, 2));

        // Enviar respuesta de éxito
        res.send('Datos actualizados correctamente.');
    } catch (err) {
        console.error('Error al leer o escribir el archivo:', err);
        res.status(500).send('Ocurrió un error al procesar los datos.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
