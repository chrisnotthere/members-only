var express = require('express');
var router = express.Router();
var message_controller = require('../controllers/messageController');

// GET message page
router.get('/', message_controller.message_get);

// POST message page
router.post('/', message_controller.message_post);

module.exports = router;
