const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('./UserModel')
const validateShortName = require('../lib/validateShortName')

const MenuSchema = new Schema({
  propietario: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        UserModel.findById(v, 'max_menus menus', function (err, usuario) {
          if (err) {
            cb(err, false)
          } else {
            if (!(usuario.menus.length >= usuario.max_menus)) {
              cb(true)
            } else {
              cb(null, false)
            }
          }
        })
      },
      message: 'Usuario no es válido, o llegó a su límite de menus por crear.'
    },
    autopopulate: {
      maxDepth: 1
    }
  },
  /** Nombre del Menú */
  nombre: {
    type: String,
    required: [true, 'Valor necesario: nombre']
  },
  /** Descricíón del menú */
  descripcion: {
    type: String,
    required: false
  },
  /** Logo dl Menú */
  logo: {
    type: Schema.Types.Mixed,
    required: false
  },
  /** Imágenes del Menu */
  images: [{
    type: Schema.Types.Mixed,
    required: false
  }],
  max_platos: {
    type: Number,
    required: true,
    default: 10
  },
  /** Datos de la URL corta
   * Este dato se usará para la creación del la URL corta. La URL quedaría de esta forma.:
   * https:/mevouapp.com/m/shortnametext
   * No debe llevar carateres espaciales. Solo letras en minusculas y numeros 
   * 
   */
  shortname: {
    type: String,
    required: [true, "Valor Necesario: shortname"],
    unique: true,
    validate: {
      validator: function (v) {
        return validateShortName
      (v)
      },
      message: 'El valor shortname debe incluir solo números, letras minúsculas o punto.'
    }
  }
}, {
  strict: true
})

MenuSchema.pre('save', function(next){
  this.shortname = String(this.shortname).toLowerCase()
  next()
})

MenuSchema.post('save', function (doc) {
  UserModel.findByIdAndUpdate(doc.propietario, {
    $addToSet: {
      Menus: doc._id
    }
  }, {
    new: true
  }, function (err, usuarioActualizado) {
    if (err) {
      console.log('Error el menú a al Usuario.', err)
    } else {
      console.log(`'Menu ${doc.nombre} : ${doc._id} Agregada con éxito al usuario: ${usuarioActualizado.username}:${usuarioActualizado._id}`)
    }
  })
})

const MenuModel = mongoose.model('menu', MenuSchema)

module.exports = MenuModel