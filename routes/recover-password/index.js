var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('recover-password', {
    title: 'Recuperar Contraseña'
  });
});

module.exports = router;