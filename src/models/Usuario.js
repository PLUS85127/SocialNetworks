const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mi esquema de usuario 
const usuarioSchema = new Schema({
  //nombre de mi usuario pero esta vez le indico que sea unico
  nombre: { type: String, required: true, unique: true },
  //al igual que email que sea unico
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
