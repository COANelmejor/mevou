
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
        res.send(404)
      }
    })
  } else {
    res.send(403)
  }
}