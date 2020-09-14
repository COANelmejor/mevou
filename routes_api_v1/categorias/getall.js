const CategoriaModel = require("../../models/CategoriaModel");

module.exports = function (req, res) {

  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const filter = req.query.filter || {};
  const projection = req.query.projection || null

  filter.propietario = req.user._id
  
  CategoriaModel.find(filter, projection, { limit, skip }, function (err, dataCategorias) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataCategorias.length == 0 ? 404 : 200).send(dataCategorias)
    } 
  })
}
