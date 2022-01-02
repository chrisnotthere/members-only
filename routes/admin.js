var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/adminController');

// GET admin page
router.get('/', admin_controller.admin_get);

// POST admin page
router.post('/', admin_controller.admin_post);

module.exports = router;
