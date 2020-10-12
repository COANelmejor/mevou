const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  var body = req.body
  var update = {}
  if (body.nombre != null) {
    update.nombre = body.nombre
  }
  if (body.apellido != null) {
    update.apellido = body.apellido
  }
  if (body.email != null) {
    update.email = body.email
  }
  if (body.telefono != null) {
    update.telefono = body.telefono
  }
  if (body.whatsapp != null) {
    update.whatsapp = body.whatsapp
  }
  if (body.fiscal_nombre != null) {
    update.fiscal_nombre = body.fiscal_nombre
  }
  if (body.fiscal_numero != null) {
    update.fiscal_numero = body.fiscal_numero
  }
  if (body.fiscal_direccion != null) {
    update.fiscal_direccion = body.fiscal_direccion
  }
  UserModel.findByIdAndUpdate(req.user._id, {
    $set: update
  }, {
    new: true,
    select: '-salt -password -Menus'
  }, function (err, usuarioActualizado) {
    if (err) {
      res.status(500).send({
        message: 'Hubo un error al buscar tu perfil.',
        error: err
      })
    } else {
      res.send(usuarioActualizado)
    }
  })
}