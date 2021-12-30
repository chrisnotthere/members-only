var express = require('express');
var router = express.Router();
var member_controller = require('../controllers/memberController');

// GET member page
router.get('/', member_controller.member_get);

// POST member page
router.post('/', member_controller.member_post);

module.exports = router;
