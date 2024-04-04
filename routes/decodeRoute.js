const express = require('express');
const decodeController = require('./../controllers/decodeController');

const router = express.Router();

router.get('/:id',decodeController);

module.exports = router;