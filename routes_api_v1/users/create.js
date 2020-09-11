const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')

module.exports = function (req, res) {
    var nuevoUsuario = req.body
    const passRaw = req.body.password
    nuevoUsuario.salt = ut.createSalt()
    nuevoUsuario.password = ut.createHash(passRaw, nuevoUsuario.salt)
    UserModel.create(nuevoUsuario, function (err, userCreado) {
      if (err) {
        console.log(err)
        // eslint-disable-next-line no-prototype-builtins
        if (err.code === 11000 && err.keyPattern.hasOwnProperty('email')) {
          res.status(409).send({
            message: `El correo '${err.keyValue.email}' ya existe en el sitio.`,
            error: err
          })
        } else {
          console.log('err', err)
          res.status(500).send({
            message: 'Hubo un error al crear al Administrador de Sede.',
            error: err
          })
        }
      } else {
        userCreado.salt = null
        userCreado.password = null
        res.status(201).send(userCreado)
      }
    })
  
}
