const MenuModel = require("../../models/MenuModel");

module.exports = function (req, res) {
  const updateBody = req.body;
  const filter = {
    _id: req.params.id,
    propietario: req.user._id
  }
  updateBody.propietario = req.user._id

  MenuModel.findOneAndUpdate(filter, {
    $set: updateBody
  }, {
    new: true
  }, function (err, MenuUpdated) {
    if (err) {
      res.status(500).send(err);
    } else if (MenuUpdated == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(MenuUpdated);
    }
  })
}
