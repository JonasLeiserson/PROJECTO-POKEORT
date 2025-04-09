const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sql = require('./db');

app.use(cors({
    origin: "*", 
    credentials: true 
}));

app.use(bodyParser.json());

// lee datos de DatosPokeorts.json
app.get('/leer-datos', async(req, res) => {
    const data = await obtenerPokeortsConAtaques();
    console.log(data)
    res.json(data);
});

// escribe datos en PokemonesEstadisticas.json
app.post('/guardar-datos', (req, res) => {
    const nuevosDatos = req.body;
    console.log('Datos recibidos:', nuevosDatos);
    fs.writeFileSync('PokemonesEstadisticas.json', JSON.stringify(nuevosDatos, null, 2));
    res.send('Datos actualizados correctamente.');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

//cosas base de datos
const obtenerPokeortsConAtaques = async () => {
  
  const pokeorts =   await sql`SELECT * FROM pokeorts`;

  const ataquesPorPokeort = {};

  
  const ataques =  await sql`SELECT * FROM ataques`;

  for (const atk of ataques) {
    if (!ataquesPorPokeort[atk.pokeort_id]) {
      ataquesPorPokeort[atk.pokeort_id] = [];
    }
    ataquesPorPokeort[atk.pokeort_id].push({
      nombre: atk.nombre,
      tipo: atk.tipo,
      potencia: atk.potencia,
      precision: atk.precision,
      descripcion: atk.descripcion
    });
  }

 
  const resultado = pokeorts.map(pokeort => ({
    ...pokeort,
    ataques: ataquesPorPokeort[pokeort.pokeort_id] || []
  }));

  return resultado;
};
