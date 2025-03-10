const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seguidorSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  seguidoId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Seguidor', seguidorSchema);