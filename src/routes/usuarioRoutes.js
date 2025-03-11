const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

//insertar mi usuario (para que pueda crear usuarios y asi hacer las pruebas)
router.post('/', usuarioController.insertarUsuario);

//obtener un usuario en especifico
router.get('/:id', usuarioController.getUserById);

module.exports = router;
