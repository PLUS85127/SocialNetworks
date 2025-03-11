const express = require('express');
const mensajeController = require('../controllers/mensajeController');//mi ruta de mensaje
const router = express.Router();

//mis rutas que voy a utilizar para mis mensajes

//enviar
router.post('/', mensajeController.enviarMensaje);

//obtener (mensajes recibidos)
router.get('/recibidos', mensajeController.mensajesRecibidos);

module.exports = router;
