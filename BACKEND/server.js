const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

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



//login

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: '1234', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        sameSite: 'Lax',
        httpOnly: true 
    }
}));

app.use(express.static(path.join(__dirname, '../frontend')));


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('usuarios.json', 'utf8', (err, data) => {

        let usuarios = {};
        if (data) {
            try {
                usuarios = JSON.parse(data);
            } catch (parseError) {
                return res.status(500).send('Error al parsear usuarios.json.');
            }
        }

        if (usuarios[username] && usuarios[username] === password) {
            req.session.user = username; 
            res.redirect('/pag_inicial/index.html');
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
        res.send('Sesión cerrada. <a href="/http://localhost:3000/login">Iniciar sesión</a>');
    });
});

app.post('/CrearUsuario', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        let usuarios = {};
        if (data) {
            usuarios = JSON.parse(data);
        }

        if (usuarios[username]) {
            return res.status(400).send('El usuario ya existe.');
        }

        
        usuarios[username] = password;
        console.log(usuarios)
        fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2), () => {
            res.send('Usuario creado exitosamente.');
        });
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
