var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

// GET sign-up page
router.get('/', user_controller.user_create_get);

// POST request for creating new user
router.post('/', user_controller.user_create_post);

module.exports = router;
