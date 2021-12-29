var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('log-in', { title: 'Login', error: false} );
});

/* POST login page. */
router.post('/', function(req, res, next) {
    //res.render('log-in', { title: 'Login', error: false} );
    res.redirect('/');
  });

module.exports = router;
