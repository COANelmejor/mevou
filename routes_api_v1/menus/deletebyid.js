const MenuModel = require("../../models/MenuModel");

module.exports = function (req, res) {
  const conditions = {
    _id: req.params.id,
    propietario: req.user._id
  }
  MenuModel.findOneAndRemove(conditions, function (err, MenudoEliminado) {
    if (err) {
      res.status(500).send(err);
    } else if(MenudoEliminado == null){
      res.status(404).send({})
    } else {
      res.status(200).send(MenudoEliminado)
    }
  })
}
