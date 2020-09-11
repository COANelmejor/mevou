// const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')
const aws = require('aws-sdk');

const awskey = require('../../.secrets/awskey')
aws.SES(awskey)

module.exports = function (req, res) {
  const email = req.body.email
  UserModel.findOne({ email }, function(err, usuario) {
    if (err) {
      res.status(500).send({
        mensaje: 'Hubo un error al consultar el correo.',
        error: err
      })
    } else if (usuario == null) {
      res.status(404).send({
        mensaje: 'El correo proporcionado no corresponde a ningún usuario.'
      })
    } else {
      res.status.send(usuario)
    }
  })
}
