const PlatilloModel = require("../../models/PlatilloModel");

module.exports = function (req, res) {
  const projection = req.query.projection || null
  const filter = {
    _id : req.params.id,
    propietario: req.user._id
  }
  PlatilloModel.findOne(filter, projection, function (err, dataPlatillos) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataPlatillos == null ? 404 : 200).send(dataPlatillos)
    }
  })
}