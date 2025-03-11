const Mensaje = require('../models/Mensaje');

//Enviar mensaje
exports.enviarMensaje = async (req, res) => {
  const { remitenteId, destinatarioId, contenido, archivosAdjuntos } = req.body;

  //verificar si el que envia y recibe son los mismos
  if (remitenteId === destinatarioId) {
    return res.status(400).json({ success: false, message: 'No puedes enviarte un mensaje a ti mismo' });
  }

  try {
    //ni}evo mensaje
    const mensaje = new Mensaje({ remitenteId, destinatarioId, contenido, archivosAdjuntos });
    await mensaje.save(); //y guardo el mensaje
    res.status(201).json({ success: true, message: 'Mensaje enviado exitosamente', data: mensaje });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje', error: error.message });
  }
};

//recibir mensaje
exports.mensajesRecibidos = async (req, res) => {
  const { usuarioId } = req.body; //traer el Id del usuario pero dentro del body

  try {
    //busco el mensaje donde el mensaje es el destinatario
    const mensajes = await Mensaje.find({ destinatarioId: usuarioId })
      .populate('remitenteId', '_id nombre email') 
      .sort('-createdAt'); //ordenar los resultados de la consulta
    res.json({ success: true, mensajes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los mensajes', error: error.message });
  }
};
