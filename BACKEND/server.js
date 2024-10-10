const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(cors({
    origin: '*', 
    credentials: false 
}));

app.use(bodyParser.json());

//lee datos de DatosPokeorts.json
app.get('/leer-datos', (req, res) => {
    try {
        const data = fs.readFileSync('DatosPokeorts.json', 'utf8');
        res.send(data);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer los datos');
    }
});

//escribe datos en PokemonesEstadisticas.json
app.post('/guardar-datos', (req, res) => {
    try {
        const nuevosDatos = req.body;
        console.log('Datos recibidos:', nuevosDatos);
        fs.writeFileSync('PokemonesEstadisticas.json', JSON.stringify(nuevosDatos, null, 2));
        res.send('Datos actualizados correctamente.');
    } catch (err) {
        console.error('Error al escribir el archivo:', err);
        res.status(500).send('Ocurrió un error al procesar los datos.');
    }
});




//lee datos de PokemonesEstadisticas.json
app.get('/leer-datos-de-pokeorts', (req, res) => {
    try {
        const data = fs.readFileSync('PokemonesEstadisticas.json', 'utf8');
        res.send(data);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer los datos');
    }
});

//login


let usuarios = {};
fs.readFile('usuarios.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo de usuarios:', err);
        return;
    }
    usuarios = JSON.parse(data);
    console.log(usuarios)
});

app.use(cors({
    origin: '*', 
    credentials: true 
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'tu_secreto', 
    resave: false,
    saveUninitialized: true
}));

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Leer el archivo de usuarios
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de usuarios:', err);
            return res.status(500).send('Error en el servidor');
        }

        const usuarios = JSON.parse(data); // Parsear el contenido del JSON
        
        // Verificar las credenciales
        if (usuarios[username] && usuarios[username] === password) {
            req.session.user = username; // Guardar el usuario en la sesión
            res.send(`¡Bienvenido, ${username}! <a href="/logout">Cerrar sesión</a>`);
        } else {
            res.send('Usuario o contraseña incorrectos. <a href="/login">Intenta de nuevo</a>');
        }
    });
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.send('Sesión cerrada. <a href="/login">Iniciar sesión</a>');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
