const express = require('express')
const router = express.Router()
const create = require('./create')
const changePassword = require('./passwordChange')
const validateEmail = require('./validateEmail')
const recoverPassword = require('./recoverPassword')
const isLoggedAPI = require('../../mw/isUserLoggedAPI')

router.post('/register', create)
router.post('/password', isLoggedAPI, changePassword)
router.post('/validate-email', validateEmail)
router.post('/recover-password', recoverPassword)

module.exports = router
