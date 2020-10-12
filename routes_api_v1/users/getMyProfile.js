module.exports = function(req, res) {
  var usuario = req.user.toObject()
  delete usuario.Menus
  res.send(usuario)
}