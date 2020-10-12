const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  UserModel.findById(req.user._id, '-salt -password -Menus', {
    lean: true
  }, function (err, usuarioLogueado) {
    if (err) {
      res.status(500).send({
        message: 'Hubo un error al buscar tu perfil.',
        error: 'err'
      })
    } else {
      res.send(usuarioLogueado)
    }
  })
}