const CategoriaModel = require("../../models/CategoriaModel");
const PlatilloModel = require("../../models/PlatilloModel");

module.exports = function (req, res) {
  const conditionsCategoria = {
    _id: req.params.id,
    propietario: req.user._id
  }
  const conditionsPlatillo = {
    Categoria: req.params.id,
    propietario: req.user._id
  }
  CategoriaModel.findOneAndRemove(conditionsCategoria, function (err, CategoriaEliminado) {
    if (err) {
      res.status(500).send(err);
    } else if(CategoriaEliminado == null){
      res.status(404).send({})
    } else {
      PlatilloModel.remove(conditionsPlatillo, function(err){
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(CategoriaEliminado)
        }
      })
    }
  })
}
