// const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')
const aws = require('aws-sdk');
const moment = require('moment')
const awskey = require('../../.secrets/awskey')
const ses = new aws.SES(awskey)

module.exports = function (req, res) {
  const email = req.body.email
  const rcv = req.body.rcv
  UserModel.findOne({
    email
  }, function (err, usuario) {
    if (err) {
      res.status(500).send({
        mensaje: 'Hubo un error al consultar el correo.',
        error: err,
        email,
        rcv
      })
    } else if (usuario == null) {
      res.status(403).send({
        mensaje: 'El correo proporcionado no corresponde a ningún usuario.',
        email,
        rcv
      })
    } else if (usuario.rcv === rcv) {
      usuario.email_verificado = true
      usuario.email_verificado_timestamp = moment().unix()
      usuario.save(function(err) {
        if (err) {
          res.status(500).send({
            mensaje: 'Hubo un error al termianr de verificar el correo.',
            error: err,
            email,
            rcv
          })
        } else {
          const dataTemplate = {
            subject_string: `Bienveniado a Mevou, ${usuario.nombre}`,
            html_string: `<h1>Te damos la bienvenida a Mevou<br><small>El generador de menus digitales sin contacto.</small></h1>
            <h2><a href='http://mevouapp.com/login' target='_blank' rel='noopener noreferrer'>Haz clic aqui para iniciar sesión.</a></h2>`,
            html_text: `Te damos la bienvenida a Mevou\nUsa el siguiente link para inicar sesión: http://mevouapp.com/login`
          }
          const emailSend = usuario.email
          const params = {
            Template: 'mevouapp_general_template',
            Destination: {
              ToAddresses: [emailSend]
            },
            Source: 'Noreply Mevouapp <noreply@mevouapp.com>',
            TemplateData: JSON.stringify(dataTemplate)
          }
          ses.sendTemplatedEmail(params, (err, dataMail) => {
            console.log('/users/create.js:52')
            if (err) {
              res.status(500).send({
                message: 'Hubo un error al enviar el correo de verificación. El email ha sido verificado con éxito.',
                error: err,
                email,
                rcv
              });
            } else {
              res.status(200).send({
                mensaje: 'Correo validado con éxito.',
                mail: dataMail,
                email,
                rcv
              })
            }
          })
        }
      })
    } else {
      res.status(403).send({
        mensaje: 'El correo existe pero el rcv enviado no coincide con el del correo.',
        email,
        rcv
      })
    }
  })
}
