
const moment = require("moment");
const UserModel = require("../../../models/UserModel");

module.exports = function (req, res) {
  const email = req.query.email || null
  const rpv = req.query.rpv || null
  const rpmtNow = moment().unix()
  if (email && rpv) {
    UserModel.findOneAndUpdate({
      email,
      rpv,
      prpc: false,
      rpmt: {
        $gte: rpmtNow
      }
    }, {
      $set: {
        prpc: true
      }
    }, function (err, usuario) {
      if (err) {
        console.log(err)
        res.status(500).send(err);
      } else if (usuario) {
        res.render('recover-password', {
          title: 'Recuperar Contraseña',
          email: req.query.email
        });
      } else {
        // Página que buscas no existe
        res.status(404).render("others/error.ejs", {
          title: "404 No Encontrado - Μενού",
          codeError: "404",
          textError: "No Encontrado",
        })
      }
    })
  } else {
    res.status(403).render("others/error.ejs", {
      title: "403 Solicitud Prohibida - Μενού",
      codeError: "403",
      textError: "Solicitud Prohibida",
    })
  }
}