const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')

module.exports = function (req, res) {
  const passwordsIdenticos = req.body.password === req.body.repassword
  const salt = userTools.createSalt()
  const password = userTools.createHash(req.body.password, salt)
  const email = req.body.email

  if (passwordsIdenticos) {
    UserModel.findOneAndUpdate({
          email,
          prpc: true
        }, {
      $set: {
        salt,
        password,
        prpc: false
      }
    }, function (err, usuarioPassword) {
      if (err) {
        res.status(500).send({
          message: 'Error al recuperar la contraseña',
          error: err
        })
      } else if (usuarioPassword) {
        res.status(200).send({
          message: 'Contraseña recuperada con éxito.',
          usuario: usuarioPassword
        })
      } else {
        res.status(400).send({
          message: 'El email provisto no existe, o no tiene permisos para recuperar la contraseña.',
          body: req.body
        })
      }
    })
  } else {
    res.status(409).send({
      message: 'Las contraseñas provistas no coinciden.',
      body: req.body
    })
  }
}
