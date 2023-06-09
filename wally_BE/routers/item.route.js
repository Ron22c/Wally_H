const express = require('express');
const router = express.Router();
const ItemService = require('../services/item.service');

router.post('/', ItemService.getAll);

module.exports = router;