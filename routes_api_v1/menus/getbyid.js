const MenuModel = require("../../models/MenuModel");

module.exports = function (req, res) {
  const projection = req.query.projection || null
  const filter = {
    _id : req.params.id,
    propietario: req.user._id
  }
  MenuModel.findOne(filter, projection, function (err, dataMenus) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataMenus == null ? 404 : 200).send(dataMenus)
    }
  })
}