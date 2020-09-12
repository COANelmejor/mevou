// const userTools = require('../../lib/userTools')
const UserModel = require('../../models/UserModel')
const aws = require('aws-sdk');
const moment = require('moment')
const awskey = require('../../.secrets/awskey')
const ses = new aws.SES(awskey)
const uuidv4 = require('uuid').v4

module.exports = function (req, res) {
  const email = req.body.email
  UserModel.findOne({
    email
  }, function (err, usuario) {
    if (err) {
      console.log(err)
      res.status(500).send({
        mensaje: 'Hubo un error al consultar el correo.',
        error: err,
        email
      })
    } else if (usuario == null) {
      res.status(404).send({
        mensaje: 'El correo proporcionado no corresponde a ningún usuario.',
        email
      })
    } else {
      const rpmt = moment().add(10, 'minutes').unix()
      const rpv = uuidv4()
      usuario.rpmt = rpmt
      usuario.rpv = rpv
      usuario.prpc = false
      usuario.save(function(err){
        if (err) {
          console.log(err)
          res.status(500).send({
            mensaje: 'Hubo un error al tratar de guardar el codigo de restaruración. Vuelve a intentarlo.',
            error: err
          })
        } else {
          const dataTemplate = {
            subject_string: `Reinicio de Contraseña Mevou`,
            html_string: `<h1>Has pedido un reinicio de contraseña</h1>
<p>Ingresa al siguiente link para reiniciar tu contraseña.</p>
<p><a href='http://mevouapp.com/recover-password?email=${email}&rpv=${rpv}' target='_blank' rel='noopener noreferrer'>Haz clic aqui.</a></p>
<p>Tienes 10 minutos para usar este link.</p>
<p>Si no puedes hacer clic, copia el siguiente enlace en en tu navegador:</p>
<code>http://mevouapp.com/recover-password?email=${email}&rpv=${rpv}</code>
<h3><b>Nota:</b> El link solo puede ser usado una vez.</h3>`,
            html_text: `Has pedido un reinicio de contraseña\nUsa el siguiente enlace para recuperar tu contrasena:\nhttp://mevouapp.com/recover-password?email=${email}&rpv=${rpv}\n\nNota: El link solo puede ser usado una vez.`
          }
          const emailSend = email
          const params = {
            Template: 'mevouapp_general_template',
            Destination: {
              ToAddresses: [emailSend]
            },
            Source: 'Noreply Mevouapp <noreply@mevouapp.com>',
            TemplateData: JSON.stringify(dataTemplate)
          }
          ses.sendTemplatedEmail(params, (err, dataMail) => {
            if (err) {
              console.log(err)
              res.status(500).send({
                message: 'Hubo un error al enviar el correo de recuperación. Vuelve a intentarlo.',
                error: err,
                email,
              });
            } else {
              res.status(200).send({
                mensaje: 'Correo de recuperación enviado con éxito.',
                mail: dataMail,
                email,
              })
            }
          })
        }
      })
    }
  })
}
