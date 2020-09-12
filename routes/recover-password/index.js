var express = require('express');
var router = express.Router();
const send = require('./send')
const principal = require('./principal')

router.get('/', principal);
router.post('/send', send)

module.exports = router;