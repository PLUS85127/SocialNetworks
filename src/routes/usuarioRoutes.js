const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', usuarioController.insertarUsuario);
router.get('/:id', usuarioController.getUserById);

module.exports = router;