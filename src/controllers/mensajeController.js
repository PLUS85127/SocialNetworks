const Mensaje = require('../models/Mensaje');

exports.enviarMensaje = async (req, res) => {
  const { remitenteId, destinatarioId, contenido, archivosAdjuntos } = req.body;

  if (remitenteId === destinatarioId) {
    return res.status(400).json({ success: false, message: 'No puedes enviarte un mensaje a ti mismo' });
  }

  try {
    const mensaje = new Mensaje({ remitenteId, destinatarioId, contenido, archivosAdjuntos });
    await mensaje.save();
    res.status(201).json({ success: true, message: 'Mensaje enviado exitosamente', data: mensaje });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje', error: error.message });
  }
};

exports.mensajesRecibidos = async (req, res) => {
  const { usuarioId } = req.body;

  try {
    const mensajes = await Mensaje.find({ destinatarioId: usuarioId })
      .populate('remitenteId', '_id nombre email')
      .sort('-createdAt');
    res.json({ success: true, mensajes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los mensajes', error: error.message });
  }
};