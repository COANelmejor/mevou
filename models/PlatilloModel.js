const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserModel = require('./UserModel')
const MenuModel = require('./MenuModel')
const CategoriaModel = require('./CategoriaModel')

const PlatilloSchema = new Schema({
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
    // autopopulate: {
    //   maxDepth: 1
    // }
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
    // autopopulate: {
    //   maxDepth: 1
    // },
  },
  Categoria: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'categoria',
    validate: {
      isAsync: true,
      validator: function (v, cb) {
        CategoriaModel.findById(v, 'nombre apellido email', function (err, Categoria) {
          if (err) {
            cb(err, false)
          } else if (Categoria) {
            cb(true)
          } else {
            cb(null, false)
          }

        })
      },
      message: 'Categoria no es válida o no existe.'
    },
    // autopopulate: {
    //   maxDepth: 1
    // },
  },
  /** Nombre del Platillo */
  nombre: {
    type: String,
    required: [true, 'Valor necesario: nombre']
  },
  descripcion: {
    type: String,
    required: false
  },
  nota: {
    type: String,
    required: false
  },
  /** Imagen del Platillo */
  imagen: {
    type: Schema.Types.Mixed,
    required: false
  },
  tags: [{
    type: String,
    require: false
  }],
  precios: [{
    type: Schema.Types.Mixed,
    required: false
  }]
}, {
  strict: true
})

PlatilloSchema.post('save', function (doc) {
  MenuModel.findByIdAndUpdate(doc.Menu, {
    $addToSet: {
      Platillos: doc._id
    }
  }, {
    new: true
  }, function (err, MenuActualizado) {
    if (err) {
      console.log('Error al Agregar la Platillo al Menu.', err)
    } else {
      console.log(`'Platillo ${doc._id} agregado con éxito al Menú ${MenuActualizado._id}`)
    }
  })
})

PlatilloSchema.plugin(require('mongoose-autopopulate'))

const PlatillaModel = mongoose.model('platillo', PlatilloSchema)

module.exports = PlatillaModel