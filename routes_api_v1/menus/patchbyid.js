const itemListModel = require("../../models/itemListModel");

module.exports = function (req, res) {
  const updateBody = req.body;
  itemListModel.findByIdAndUpdate(req.params.id, {
    $set: updateBody
  }, {
    new: true
  }, function (err, dataitemLists) {
    if (err) {
      res.status(500).send(err);
    } else if (dataitemLists == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(dataitemLists);
    }
  })
}