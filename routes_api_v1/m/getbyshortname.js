const MenuModel = require("../../models/MenuModel");

module.exports = function (req, res) {
  const shortname = String(req.params.shortname).toLowerCase().split(' ').join('')
  console.log(req.params.shortname)
  console.log(shortname)
  MenuModel.findOne({
        shortname
      }, '-propietario', function (err, dataMenu) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(dataMenu == null ? 404 : 200).send(dataMenu)
    }
  })
}