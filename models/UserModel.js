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
  },
  /** Permit Recover Pasword Change
   * Habilita si se permite el cambio de contraseña por recuperación.
   */
  prpc:{
    type: String,
    required: false,
    default: false
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
  },
  /** Id de los Menus */
  Menus:[{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'menu',
    autopopulate: {
      maxDepth: 1
    },
    default: Array([])
  }],
  // Datos relacionados con los limites
  /** Máximo de Platillos
    * Cantidad máxima permitda para crear platos entre todos los menus
    */
  max_platillos: {
    type: Number,
    required: true,
    default: 100
  },
  /** Máximo de Imágenes
   * Cantidad máxima permitda para crear platos entre todos los platillos.
   * No se toma en cuenta las imagenes de los 
   */
  max_images: {
    type: Number,
    required: true,
    default: 0
  },
  /** Máximo de Trasacciones
   * Cantidad máxima de consulta de menus permitidas 
   */
  max_transacciones: {
    type: Number,
    required: true,
    default: 12000
  },
  /** Fecha de caducidad */
  max_fecha: {
    type: Number,
    required: [true, 'Se debe probeer un UnixTimeStamp en max_fecha'],
  },
  // Datos relacionadops con la Tributación Fiscal
  /** Nombre fiscal */
  fiscal_nombre:{
    type: String,
    required: false,
    default: ""
  },
  /** Numero de tributación fiscal */
  fiscal_numero:{
    type: String,
    required: false,
    default: ""
  },
  /** Dirección  fiscal */
  fiscal_direccion:{
    type: String,
    required: false,
    default: ""
  },
}, {
  strict: true
})

UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;