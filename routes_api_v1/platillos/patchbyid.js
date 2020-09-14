const PlatilloModel = require("../../models/PlatilloModel");

module.exports = function (req, res) {
  const updateBody = req.body;
  const filter = {
    _id: req.params.id,
    propietario: req.user._id
  }
  updateBody.propietario = req.user._id

  PlatilloModel.findOneAndUpdate(filter, {
    $set: updateBody
  }, {
    new: true
  }, function (err, PlatilloUpdated) {
    if (err) {
      res.status(500).send(err);
    } else if (PlatilloUpdated == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(PlatilloUpdated);
    }
  })
}
