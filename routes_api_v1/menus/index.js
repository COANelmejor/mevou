const express = require('express');
const router = express.Router();

const create = require('./create');
const getall = require('./getall');
const getbyid = require('./getbyid');
const patchbyid = require('./patchbyid');
const deletebyid = require('./deletebyid');

router.get('/', getall);
router.get('/:id', getbyid);
router.post('/', create);
router.patch('/:id', patchbyid);
router.delete('/:id', deletebyid);

module.exports = router;
