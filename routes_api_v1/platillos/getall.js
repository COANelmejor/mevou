const PlatilloModel = require("../../models/PlatilloModel");

module.exports = function (req, res) {

  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const filter = req.query.filter || {};
  const projection = req.query.projection || null

  filter.propietario = req.user._id
  
  PlatilloModel.find(filter, projection, { limit, skip }, function (err, dataPlatillos) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataPlatillos.length == 0 ? 404 : 200).send(dataPlatillos)
    } 
  })
}
