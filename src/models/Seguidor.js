const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mi esquema para seguidor
const seguidorSchema = new Schema({
  //id del usuario que va a seguir (osea el que sigue) usando Usuario
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  //id del usuario seguido (el queen estoy siguiendo)
  seguidoId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Seguidor', seguidorSchema);
