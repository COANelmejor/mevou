const itemListModel = require("../../models/itemListModel");

module.exports = function(req, res) {
  itemListModel.create(req.body, function (err, itemListcreado) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(itemListcreado);
    }
  })
}