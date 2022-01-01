//var async = require("async");
var User = require("../models/user");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

// Display user create form on GET.
exports.user_create_get = function (req, res, next) {
  res.render('sign-up', { title: 'Create an new new account', error: false });
};

// Handle user create on POST.
exports.user_create_post = [
  // Validate and sanitize fields.
  body("username")
    .trim()
    .isLength({ min: 3, max: 15 })
    .escape()
    .withMessage("Username must be between 3-15 characters long."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long."),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords entered must match."),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      console.log(errors);
      res.render("sign-up", {
        title: "Create a new account",
        user: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // // Data from form is valid.
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        // if err, do something
        if (err) return next(err);
        // otherwise, store hashedPassword in DB
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          avatar: req.body.avatar,
          status: 'basic',
        }).save((err) => {
          if (err) {
            return next(err);
          }
          //Successful - redirect to home page
          let msg = `You have successfully created your account. Please Login to continue.`;
          //res.redirect('/index', { title: 'Members Only', msg, user });
          res.render('index', { title: 'Members Only', msg, user });
        });
      });
    }
  },
];
