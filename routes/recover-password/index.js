var express = require('express');
var router = express.Router();
const send = require('./send')
const home = require('./principal')
router.get('/', home);

router.post('/send', send)

module.exports = router;