var express = require('express');
var router = express.Router();

/* GET sign-up page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Create an account', error: false} );
});

/* POST sign-up page. */
router.post('/', function(req, res, next) {
    //res.render('sign-up', { title: 'Create an account', error: false} );
    res.redirect('/');
  });

module.exports = router;
