//var User = require("../models/user");
var Message = require('../models/message')

const { body, validationResult } = require("express-validator");

// Display create message form on GET.
exports.message_get = function (req, res, next) {
  res.render('message', { title: 'Create a new message' });
};

// Handle create message  POST.
exports.message_post = [
// Convert the user to an array.
  (req, res, next) => {
    if (!(req.body.user instanceof Array)) {
      if (typeof req.body.user === "undefined") req.body.user = [];
      else req.body.user = new Array(req.body.user);
    }
    next();
  },

  // Validate and sanitize fields.
  body("title")
    .isLength({ min: 1, max:20 })
    .withMessage("The title must be 1-20 characters."),
  body("text")
    .isLength({ min: 1, max: 100 })
    .withMessage("Your message must be 1-100 characters."),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // create timsstamp
    const newtimestamp = new Date().toLocaleString();
    // Create a message object with validated data.
    var message = new Message({
      msgTitle: req.body.title,
      timestamp: newtimestamp,
      text: req.body.text,
      user: app.locals.currentUser,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again.
      res.render("message", { title: "Create a new message", errors: errors.array() });
      return;
    } else {
      // Data from form is valid. Save message.
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to index.
        res.redirect('/');
      });
    }
  },
];
