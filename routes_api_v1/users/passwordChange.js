const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  const salt = userTools.createSalt()
  const password = userTools.createHash(req.body.password, salt)
  UserModel.findByIdAndUpdate(req.user._id, {
    $set: {
      salt, password
    }
  }, function (err, usuarioCreado) {
    if (err) {
      res.status(500).send({
        message: 'Error al cambiar la contraseña',
        error: err
      })
    } else {
      res.status(200).send({
        message: 'Contraseña cambiada con éxito.',
        usuario: usuarioCreado
      })
    }
  })
}
