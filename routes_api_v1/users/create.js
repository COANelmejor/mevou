const UserModel = require('../../models/UserModel')
const ut = require('../../lib/userTools')
const aws = require('aws-sdk')
const uuidv4 = require('uuid').v4

const awskey = require('../../.secrets/awskey')
const moment = require('moment')
const ses = new aws.SES(awskey)

module.exports = function (req, res) {
    var nuevoUsuario = req.body
    const passRaw = req.body.password
    const rcv = uuidv4()
    nuevoUsuario.salt = ut.createSalt()
    nuevoUsuario.password = ut.createHash(passRaw, nuevoUsuario.salt)
    nuevoUsuario.email_verificado = false
    nuevoUsuario.rcv = rcv
    nuevoUsuario.max_fecha = moment().minute(0).hour(0).add(15, 'days').unix()
    nuevoUsuario.max_platos = 100
    UserModel.create(nuevoUsuario, function (err, userCreado) {
      if (err) {
        console.log('/users/create.js:19')
        console.log(err)
        // eslint-disable-next-line no-prototype-builtins
        if (err.code === 11000 && err.keyPattern.hasOwnProperty('email')) {
          res.status(409).send({
            message: `El correo '${err.keyValue.email}' ya existe en el sitio.`,
            error: err
          })
        } else {
        console.log('/users/create.js:28')
          console.log(err)
          res.status(500).send({
            message: 'Hubo un error al crear al usuario.',
            error: err
          })
        }
      } else {
        userCreado.salt = null
        userCreado.password = null
        const dataTemplate = {
          name : userCreado.nombre,
          url_validar: `https://mevouapp.com/verificar-email?email=${userCreado.email}&rcv=${userCreado.rcv}`
        }
        const emailSend = userCreado.email
        const params = {
          Template: 'mevouapp_bienvenido_es',
          Destination: {
            ToAddresses: [emailSend]
          },
          Source: 'Noreply Mevouapp <noreply@mevouapp.com>', // use the SES domain or email verified in your account
          TemplateData: JSON.stringify(dataTemplate)
        }
        ses.sendTemplatedEmail(params, (err, dataMail) => {
        console.log('/users/create.js:52')
          if (err) {
            res.status(500).send({
              message: 'Hubo un error al enviar el correo de verificación. El usuario ha sido creado.',
              error: err,
              usuario: nuevoUsuario 
            });
          } else {
            res.status(201).send({
              message: 'Usuario registrado con exito. Te hemos enviado un email para verficarlo.',
              usuario: userCreado,
              mail: dataMail
            })
          }
        })
      }
    })
  
}
