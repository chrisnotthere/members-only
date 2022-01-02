var express = require('express');
var router = express.Router();
var delete_controller = require('../controllers/deleteController');

// GET delete page
router.get('/:id', delete_controller.delete_get);

// POST delete page
router.post('/:id', delete_controller.delete_post);

module.exports = router;
