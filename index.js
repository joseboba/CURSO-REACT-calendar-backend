const express = require('express');
const {dbConnection} = require('./database/config')
const cors = require('cors')
require('dotenv').config(); 

//Crear el servidor de express 
const app = express();

//Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'))

//CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'))

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${ process.env.PORT }`)
});

