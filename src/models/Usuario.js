const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);