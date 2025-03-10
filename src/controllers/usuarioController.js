const Usuario = require('../models/Usuario');

exports.insertarUsuario = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();
    res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear el usuario', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al traer usuario', error: error.message });
  }
};