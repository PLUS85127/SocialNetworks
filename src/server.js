const express = require('express');
const connectDB = require('./config/db');

//traigo mis rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const seguidorRoutes = require('./routes/seguidorRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

//creo mis rutas para las diferentes acciones
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/seguidores', seguidorRoutes);
app.use('/api/mensajes', mensajeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
