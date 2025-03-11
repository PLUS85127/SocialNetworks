const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mi esquema para el mensaje
const mensajeSchema = new Schema({
  //uso un id delremitente que me estoy referenciado a usuario
  remitenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  //un id de destinatario igual referenciado a usuario
  destinatarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  //contenod que quiero que lleve el mensaje
  contenido: String,
  archivosAdjuntos: [{ //creo una lista de los acrhivos adjuntados
    nombreArchivo: String, 
    url: String
  }],
  leido: { type: Boolean, default: false } //solo para checar si ya lei el mensaje que por defecto lo dejo por no leido
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', mensajeSchema);
