const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
  remitenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  destinatarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenido: String,
  archivosAdjuntos: [{
    nombreArchivo: String,
    url: String
  }],
  leido: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', mensajeSchema);