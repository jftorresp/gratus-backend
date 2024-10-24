const express = require('express');
const keys = require('./config/keys.js');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const allowedOrigins = ['http://157.253.242.66', 'http://dsit-sdc232.ad.uniandes.edu.co'];

app.use(cors({
    origin: function (origin, callback) {
        // Verifica si el origen está en la lista de orígenes permitidos o si no hay origen (para solicitudes sin origen)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

//parse application/x-www-form-urlencoded
app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Conectado a MongoDB local'))
    .catch(err => console.error('Error conectando a MongoDB', err));

//Setup DB models
require('./model/Account');
require('./model/ProgressData');
require('./model/MissionLog');
require('./model/StickerData');
require('./model/InventoryData');

//Setup the routes
require('./routes/AuthenticationRoutes')(app);
require('./routes/ProgressDataRoute')(app);
require('./routes/MissionLogRoutes')(app);

app.use((req, res, next) => {
    let bodySize = JSON.stringify(req.body).length;
    console.log('Tamaño del body de la solicitud:', bodySize, 'bytes');
    next();
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    // Registrar información detallada del error y la solicitud
    console.error('Error:', err);
    console.error('Error en la ruta:', req.method, req.url);
    console.error('Datos del cliente:', req.headers);
    console.error('Body de la solicitud:', req.body);

    if (err.code === 'ECONNABORTED') {
        console.error('Error: La solicitud fue abortada por el cliente.');
        return res.status(408).json({ error: 'La solicitud fue abortada.' });
    }

    console.error(err.stack);
    res.status(500).send('Error en el servidor.');
});

const ip = '0.0.0.0';

const server = app.listen(keys.port, ip, () => {
    console.log(`Server running at http://${ip}:${keys.port}/`);
});

// Aumenta el timeout a 3 minutos
server.setTimeout(3 * 60 * 1000);