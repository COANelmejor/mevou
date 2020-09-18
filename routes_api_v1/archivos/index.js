// TODO RUTA: Crear admin de sedevar express = require('express');
const express = require('express')
const router = express.Router()
const create = require('./create')
// eslint-disable-next-line camelcase
const isLoggedAPI = require('../../mw/isUserLoggedAPI')

const awsKey = require('../../.secrets/awskey')
const bucketName = require('../../.secrets/awsS3').ImagenesBucket
const uuidv4 = require('uuid').v4

const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
aws.config.update(awsKey)

const s3 = new aws.S3({})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const name = `${req.user._id || 'nouser'}/${req.query.documento || 'general'}_${req.query.parametro || 'otros'}_${req.query.id || uuidv4()}`
      const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
      cb(null, name + ext)
    }
  })
})

/* GET home page. */
// router.get('/', isLoggedAPI_SA_AS_PR, getAll)
router.post('/', isLoggedAPI, upload.single('archivo'), create)
// router.patch('/:id', create)
// router.post('/', create)
// router.post('/', create)

module.exports = router
