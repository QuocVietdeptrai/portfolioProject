const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

router.get('/', contactController.getContact);
router.post('/', contactController.sendMessage);

module.exports = router;
