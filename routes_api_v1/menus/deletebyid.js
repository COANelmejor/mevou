const MenuModel = require("../../models/MenuModel");
const PlatilloModel = require("../../models/PlatilloModel");
const CategoriaModel = require("../../models/CategoriaModel");

module.exports = function (req, res) {
  const conditions = {
    _id: req.params.id,
    propietario: req.user._id
  }
  const conditionsCategoria = {
    Menu: req.params.id,
    propietario: req.user._id
  }
  const conditionsPlatillo = {
    Menu: req.params.id,
    propietario: req.user._id
  }
  MenuModel.findOneAndRemove(conditions, function (err, MenudoEliminado) {
    if (err) {
      res.status(500).send(err);
    } else if (MenudoEliminado == null) {
      res.status(404).send({})
    } else {
      CategoriaModel.remove(conditionsCategoria, function (err, CategoriaEliminado) {
        if (err) {
          res.status(500).send(err);
        } else if (CategoriaEliminado == null) {
          res.status(404).send({})
        } else {
          PlatilloModel.remove(conditionsPlatillo, function (err) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send(MenudoEliminado)
            }
          })
        }
      })
    }
  })
}