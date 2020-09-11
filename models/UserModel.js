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
    type: String,
    required: false
  },
  whatsapp:{
    type: String,
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
    type: Schema.Types.Mixed,
    required: false,
  },
  /** Recovery Password Max Timestamp
   * Timestamp que representa la hora máxima para reiniciar una contraseña.
   */
  rpmt: {
    type: Number,
    required: false,
    default: 0
  },
  /** Recovery Password Validator
   * String en formato uuidv4 que debe enviarse al correo electronico, y debe cambiarse al recuperar
   * la contraseña.
   */
  rpv: {
    type: String,
    required: false,
    unique: true
  },
  /** Register Code Validator
   * Codigo validador que se envia conla creación del usuario. 
   * Se utiliza para validad si el correo es real.
   */
  rcv: {
    type: String,
    required: true
  },
  email_verificado: {
    type: Boolean,
    default: false
  },
  email_verificado_timestamp: {
    type: Number,
    default: false
  }
}, {
  strict: true
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;