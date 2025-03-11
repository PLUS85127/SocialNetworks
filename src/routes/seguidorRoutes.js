const express = require('express');
const seguidorController = require('../controllers/seguidorController');
const router = express.Router();

//seguir usuario
router.post('/seguir/:usuarioId', seguidorController.seguirUsuario);

//dejar de seguir a un usuario
router.delete('/dejardeseguir/:usuarioId', seguidorController.dejarSeguirUsuario);

module.exports = router;
