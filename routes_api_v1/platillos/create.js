const PlatilloModel = require("../../models/PlatilloModel")

module.exports = function(req, res) {
  var Platillo = req.body
  console.log(Platillo)
  Platillo.propietario = req.user._id
  PlatilloModel.create(req.body, function (err, PlatilloCreado) {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.status(201).send(PlatilloCreado)
    }
  })
}
