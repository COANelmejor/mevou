module.exports = function (req, res) {
  if (req.file) { 
    res.status(201).send(req.file)
  } else {
    res.sendStatus(500)
  }
}
