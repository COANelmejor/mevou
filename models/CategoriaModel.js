const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserModel = require('./UserModel')
const MenuModel = require('./MenuModel')

const CategoriaSchema = new Schema({
  propietario: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        UserModel.findById(v, 'nombre apellido email', function (err, usuario) {
          if (err) {
            cb(err, false)
          } else if (usuario) {
            cb(true)
          } else {
            cb(null, false)
          }

        })
      },
      message: 'Usuario no es válido o no existe.'
    },
    autopopulate: {
      maxDepth: 1
    }
  },
  Menu: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'menu',
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        MenuModel.findById(v, 'nombre apellido email', function (err, usuario) {
          if (err) {
            cb(err, false)
          } else if (usuario) {
            cb(true)
          } else {
            cb(null, false)
          }

        })
      },
      message: 'Usuario no es válido o no existe.'
    },
    autopopulate: {
      maxDepth: 1
    },
  },
  /** Nombre del Menú */
  nombre: {
    type: String,
    required: [true, 'Valor necesario: nombre']
  },
  /** Imágenes del Menu */
  images: [{
    type: Schema.Types.Mixed,
    required: false
  }],
}, {
  strict: true
})

CategoriaSchema.post('save', function (doc) {
  MenuModel.findByIdAndUpdate(doc.Menu, {
    $addToSet: {
      Categorias: doc._id
    }
  }, {
    new: true
  }, function (err, MenuActualizado) {
    if (err) {
      console.log('Error al Agregar la Categoria al menu.', err)
    } else {
      console.log(`'Menu ${doc._id} agregado con éxito al usuario ${MenuActualizado._id}`)
    }
  })
})

CategoriaSchema.plugin(require('mongoose-autopopulate'))

const CategoriaModel = mongoose.model('categoria', CategoriaSchema)

module.exports = CategoriaModel