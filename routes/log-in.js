var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');

// GET login page
router.get('/', login_controller.login_get);

// POST login page
router.post('/', login_controller.login_post);

module.exports = router;
