const MenuModel = require("../../models/MenuModel");

module.exports = function (req, res) {

  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const filter = req.query.filter || {};
  const projection = req.query.projection || null

  filter.propietario = req.user._id
  
  MenuModel.find(filter, projection, { limit, skip }, function (err, dataMenus) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataMenus.length == 0 ? 404 : 200).send(dataMenus)
    } 
  })
}
