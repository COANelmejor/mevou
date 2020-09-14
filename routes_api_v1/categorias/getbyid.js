const CategoriaModel = require("../../models/CategoriaModel");

module.exports = function (req, res) {
  const projection = req.query.projection || null
  const filter = {
    _id : req.params.id,
    propietario: req.user._id
  }
  CategoriaModel.findOne(filter, projection, function (err, dataCategorias) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataCategorias == null ? 404 : 200).send(dataCategorias)
    }
  })
}