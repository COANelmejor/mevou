const CategoriaModel = require("../../models/CategoriaModel")

module.exports = function(req, res) {
  var Categoria = req.body
  Categoria.propietario = req.user._id
  CategoriaModel.create(req.body, function (err, CategoriaCreado) {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.status(201).send(CategoriaCreado)
    }
  })
}
