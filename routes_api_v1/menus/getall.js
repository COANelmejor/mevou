const itemListModel = require("../../models/itemListModel");

module.exports = function (req, res) {

  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const filter = req.query.filter || {};
  const projection = req.query.projection || null

  itemListModel.find(filter, projection, { limit, skip }, function (err, dataitemLists) {
    if (err) {
      res.status(500).send(err);
    } else if (dataitemLists == null) {
      res.status(404).send({})
    } else {
      res.status(200).send(dataitemLists);
    }
  })
}