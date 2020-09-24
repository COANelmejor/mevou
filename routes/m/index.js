const express = require('express');
const router = express.Router();
const home = require('./principal');
const isLogged = require('../../mw/isLogged');

/* GET home page. */
router.get('/', isLogged, home);

module.exports = router;