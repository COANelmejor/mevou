const CategoriaModel = require("../../models/CategoriaModel");

module.exports = function (req, res) {
  const conditions = {
    _id: req.params.id,
    propietario: req.user._id
  }
  CategoriaModel.findOneAndRemove(conditions, function (err, CategoriaEliminado) {
    if (err) {
      res.status(500).send(err);
    } else if(CategoriaEliminado == null){
      res.status(404).send({})
    } else {
      res.status(200).send(CategoriaEliminado)
    }
  })
}
