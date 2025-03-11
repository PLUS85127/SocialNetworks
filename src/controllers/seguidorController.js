const Seguidor = require('../models/Seguidor');

exports.seguirUsuario = async (req, res) => {
  const { usuarioId } = req.params; // traer el id del usuario que se va a seguir en los parametros osea en la url
  const { usuarioActualId } = req.body;  //y el id del usuario actual en el body

    //evitar seguirme a mi mismo
  if (usuarioActualId === usuarioId) {
    return res.status(400).json({ success: false, message: 'No puedes seguirte a ti mismo' });
  }

  try {
    //checar si ya sigo este usuario
    const seguidorExiste = await Seguidor.findOne({ usuarioId: usuarioActualId, seguidoId: usuarioId });
    if (seguidorExiste) {
      return res.status(400).json({ success: false, message: 'Ya estás siguiendo a este usuario' });
    }

    //crear un nuevo seguidor
    const nuevoSeguidor = new Seguidor({ usuarioId: usuarioActualId, seguidoId: usuarioId });
    await nuevoSeguidor.save(); //guardarlo
    res.status(201).json({ success: true, message: 'Usuario seguido exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al seguir al usuario', error: error.message });
  }
};

//dejar de segur a el usuario
exports.dejarSeguirUsuario = async (req, res) => {
  const { usuarioId } = req.params; //id del usuario a dejar de seguir en la url
  const { usuarioActualId } = req.body; //id del usuario actual en el body

  try {
    //busco y elimino el mensaje del seguidor
    const seguidor = await Seguidor.findOneAndDelete({ usuarioId: usuarioActualId, seguidoId: usuarioId });
    if (!seguidor) {
      return res.status(404).json({ success: false, message: 'No estás siguiendo a este usuario' });
    }
    res.json({ success: true, message: 'Has dejado de seguir al usuario' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al dejar de seguir al usuario', error: error.message });
  }
};
