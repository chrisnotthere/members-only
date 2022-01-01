var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   //res.render('index', { title: 'Members Only', user: req.user} );
//   res.render('index', { title: 'Members Only' } );
// });

// GET home page
router.get('/', index_controller.index_get);

module.exports = router;
