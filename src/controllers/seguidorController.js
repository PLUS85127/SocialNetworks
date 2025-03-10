const Seguidor = require('../models/Seguidor');

exports.seguirUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  const { usuarioActualId } = req.body;

  if (usuarioActualId === usuarioId) {
    return res.status(400).json({ success: false, message: 'No puedes seguirte a ti mismo' });
  }

  try {
    const seguidorExiste = await Seguidor.findOne({ usuarioId: usuarioActualId, seguidoId: usuarioId });
    if (seguidorExiste) {
      return res.status(400).json({ success: false, message: 'Ya estás siguiendo a este usuario' });
    }

    const nuevoSeguidor = new Seguidor({ usuarioId: usuarioActualId, seguidoId: usuarioId });
    await nuevoSeguidor.save();
    res.status(201).json({ success: true, message: 'Usuario seguido exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al seguir al usuario', error: error.message });
  }
};

exports.dejarSeguirUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  const { usuarioActualId } = req.body;

  try {
    const seguidor = await Seguidor.findOneAndDelete({ usuarioId: usuarioActualId, seguidoId: usuarioId });
    if (!seguidor) {
      return res.status(404).json({ success: false, message: 'No estás siguiendo a este usuario' });
    }
    res.json({ success: true, message: 'Has dejado de seguir al usuario' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al dejar de seguir al usuario', error: error.message });
  }
};