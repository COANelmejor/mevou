const express = require('express')
const router = express.Router()
const create = require('./create')
const changePassword = require('./passwordChange')
const validateEmail = require('./validateEmail')
const isLoggedAPI = require('../../mw/isUserLoggedAPI')

router.post('/register', create)
router.post('/password', isLoggedAPI, changePassword)
router.post('/validate-email', validateEmail)

module.exports = router
