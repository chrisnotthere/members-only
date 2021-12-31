var express = require('express');
var router = express.Router();
var signup_controller = require('../controllers/signupController');

// GET sign-up page
router.get('/', signup_controller.user_create_get);

// POST sign-up page
router.post('/', signup_controller.user_create_post);

module.exports = router;
