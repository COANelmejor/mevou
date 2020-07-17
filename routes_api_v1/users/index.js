const express = require('express')
const router = express.Router()
const create = require('./create')
const changePassword = require('./passwordChange')
const isLoggedAPI = require('../../mw/isUserLoggedAPI')

router.post('/register', create)
router.post('/password', isLoggedAPI, changePassword)

module.exports = router
