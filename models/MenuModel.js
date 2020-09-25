const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = require('./UserModel')
const validateShortName = require('../lib/validateShortName')

function toLower(v) {
  return v.toLowerCase().split(' ').join('');
}

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
            /*if (usuario.Menus == undefined) {
              cb(true)
            } else */ if (!(usuario.Menus.length >= usuario.max_menus)) {
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
  Categorias: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'categoria',
    autopopulate: {
      maxDepth: 1
    }
  }],
  Platillos: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'platillo',
    autopopulate: {
      maxDepth: 1
    }
  }],
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
    required: false,
    default: null
  },
  /** Imagen del Menu */
  imagen: {
    type: Schema.Types.Mixed,
    required: false,
    default: null
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
        return validateShortName(v)
      },
      message: 'El valor shortname debe incluir solo números, letras minúsculas o punto.'
    },
    set: toLower
  },
  /** Color de Fondo del menú */
  color_menu_fondo: {
    type: String,
    required: false,
    default: '#FFFFFF'
  },
  color_menu_letra: {
    type: String,
    required: false,
    default: '#000000'
  },
  color_plato_nombre_letra: {
    type: String,
    required: false,
    default: '#FFFFFF'
  },
  color_plato_nombre_fondo: {
    type: String,
    required: false,
    default: '#000000'
  },
  color_plato_desc_letra: {
    type: String,
    required: false,
    default: '#000000'
  },
  color_plato_desc_fondo: {
    type: String,
    required: false,
    default: '#FFFFFF'
  },
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

MenuSchema.plugin(require('mongoose-autopopulate'))

const MenuModel = mongoose.model('menu', MenuSchema)

module.exports = MenuModel