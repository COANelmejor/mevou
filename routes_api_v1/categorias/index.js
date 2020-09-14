const express = require('express')
const router = express.Router()
const isLoggedAPI = require('../../mw/isUserLoggedAPI')

const create = require('./create')
const getall = require('./getall')
const getbyid = require('./getbyid')
const patchbyid = require('./patchbyid')
const deletebyid = require('./deletebyid')

/** Obtener todos los Categorias de un usuario */
router.get('/', isLoggedAPI,  getall)

/** Obtener un Categoria especifo segunsu Id */
router.get('/:id', isLoggedAPI,  getbyid)

/** Actualizar los datos de un Categoria, segun su Id */
router.patch('/:id', isLoggedAPI,  patchbyid)

/** Crear un nuevo Categoria */
router.post('/', isLoggedAPI,  create)

/** Borrar un Categoria */
router.delete('/:id', isLoggedAPI,  deletebyid)

module.exports = router
