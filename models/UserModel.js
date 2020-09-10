const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validateEmail = require('../lib/validateEmail');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Valor necesario: username']
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Valor necesario: email'],
    validate: {
      validator: function (v) {
        return validateEmail(v)
      },
      message: 'Error en valor: email'
    }
  },
  tipo: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: [true, 'Valor necesario: nombre'],
    default: 'Anónimo'
  },
  activo_hasta: {
    type: Number,
    required: [true, 'Valor necesario: activo_hasta'],
    default: function () {

    }
  }
}, {
  strict: true
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;