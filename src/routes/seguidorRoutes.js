const express = require('express');
const seguidorController = require('../controllers/seguidorController');
const router = express.Router();

router.post('/seguir/:usuarioId', seguidorController.seguirUsuario);
router.delete('/dejar-seguir/:usuarioId', seguidorController.dejarSeguirUsuario);

module.exports = router;