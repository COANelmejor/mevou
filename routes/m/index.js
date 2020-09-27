const express = require('express');
const router = express.Router();
const home = require('./principal');

/* GET home page. */
router.get('/:shortname', home);

module.exports = router;