const express = require('express');
const router = express.Router();
const RecognizeService = require('../services/recognize.service');

router.post('/image', RecognizeService.predict);

module.exports = router;