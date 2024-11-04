const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: "*", 
    credentials: true 
}));

app.use(bodyParser.json());

// lee datos de DatosPokeorts.json
app.get('/leer-datos', (req, res) => {
    const data = fs.readFileSync('DatosPokeorts.json', 'utf8');
    res.send(data);
});

// escribe datos en PokemonesEstadisticas.json
app.post('/guardar-datos', (req, res) => {
    const nuevosDatos = req.body;
    console.log('Datos recibidos:', nuevosDatos);
    fs.writeFileSync('PokemonesEstadisticas.json', JSON.stringify(nuevosDatos, null, 2));
    res.send('Datos actualizados correctamente.');
});

// lee datos de PokemonesEstadisticas.json
app.get('/leer-datos-de-pokeorts', (req, res) => {
    const data = fs.readFileSync('PokemonesEstadisticas.json', 'utf8');
    res.send(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});