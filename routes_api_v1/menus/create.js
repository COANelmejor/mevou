const MenuModel = require("../../models/MenuModel");
const uudiv4 = require('uuid').v4

module.exports = function(req, res) {
  var menu = req.body
  menu.propietario = req.user._id
  menu.shortname = uudiv4()
  menu.max_platos = 10
  menu.logo = null
  menu.images = null
  MenuModel.create(req.body, function (err, MenuCreado) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(MenuCreado);
    }
  })
}
