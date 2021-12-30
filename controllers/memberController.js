var User = require("../models/user");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

// Display user create form on GET.
exports.member_get = function (req, res, next) {
    res.render('member', { title: 'Become a member of Members Only' });
};

exports.member_post = [

    // Validate and sanitize fields.
    body("password")
        .isLength({ min: 1 })
        .withMessage("You must fill out the password field."),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            console.log(errors);
            res.render("member", {
                title: "Become a member of Members Only",
                //user: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            console.log(req.body);
            if (req.body.password === 'topsecret') {
                //res.send('success! correct password');
                let msg = `Congratulations! You are now an exclusive member. You are now able to post messages.`;
                //TODO update user status to 'member
                res.render('index', { title: 'Members Only', msg });
            } else {
                //res.send('Wrong! try again!!');
                let msg = `Incorrect password.`;
                res.render('member', { title: 'Members Only', msg });
            }
        }
    }
]
