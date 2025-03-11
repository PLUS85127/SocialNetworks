const Usuario = require('../models/Usuario');

//insertar usuario
exports.insertarUsuario = async (req, res) => {
  const { nombre, email } = req.body; //solo el nombre y el email (que es lo que tengo) en el body

  try {
    //checar si el usuario se repite, me refiero a que no puedo repetr tanto nombre y email
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    //creo el usuario
    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();
    res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear el usuario', error: error.message });
  }
};

//traer el usuario con el id
exports.getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);//busoc el usuario por el id
    //si no lo encuentro que me retorne el mensaje que no se encontro
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al traer usuario', error: error.message });
  }
};
