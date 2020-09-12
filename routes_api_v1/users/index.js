const express = require('express')
const router = express.Router()
const create = require('./create')
const changePassword = require('./passwordChange')
const validateEmail = require('./validateEmail')
const recoverPassword = require('./recoverPassword')
const recoverPasswordChange = require('./recoverPasswordChange')
// const myProfile = require('./myProfile')
const isLoggedAPI = require('../../mw/isUserLoggedAPI')

router.post('/register', create)
router.post('/change-password', isLoggedAPI, changePassword)
router.post('/validate-email', validateEmail)
router.post('/recover-password', recoverPassword)
router.post('/recover-password-change', recoverPasswordChange)
// router.post('/my-profile', myProfile)

// TODO Agregar URL de consulta de perfil personal
// TODO Agregar los siguiente parametros para que no se puedan cambiar en el Perfil 
// rpmt
// rpv
// prpc
// rcv
// email_verificado
// email_verificado_timestamp


module.exports = router
