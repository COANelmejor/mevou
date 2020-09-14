const PlatilloModel = require("../../models/PlatilloModel");

module.exports = function (req, res) {
  const conditions = {
    _id: req.params.id,
    propietario: req.user._id
  }
  PlatilloModel.findOneAndRemove(conditions, function (err, PlatilloEliminado) {
    if (err) {
      res.status(500).send(err);
    } else if(PlatilloEliminado == null){
      res.status(404).send({})
    } else {
      res.status(200).send(PlatilloEliminado)
    }
  })
}
