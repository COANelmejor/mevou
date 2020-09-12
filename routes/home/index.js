var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('home', {
    title: 'Bienvenidos a Μενού',
    user: req.user
  });
});

module.exports = router;