const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateEmail = require('../lib/validateEmail');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Valor necesario: email'],
    unique: [true, 'El correo ya ha sido registrado.'],
    validate: {
      validator: function (v) {
        return validateEmail(v)
      },
      message: 'Error en valor: email'
    }
  },
  salt: {
    type: String,
    required: [true, 'Valor necesario: salt'],
  },
  password: {
    type: String,
    required: [true, 'Valor necesario: password'],
  },
  nombre: {
    type: String,
    required: [true, 'Valor necesario: nombre'],
  },
  apellido: {
    type: String,
      required: [true, 'Valor necesario: apellido'],
  },
  telefono: {
    type: Number,
    required: false
  },
  pais: {
    type: String,
    required: false
  },
  ciudad: {
    type: String,
    required: false
  },
  foto_perfil: {
    type: Object,
    required: false,
  }
}, {
  strict: true
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;