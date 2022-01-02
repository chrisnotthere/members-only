var User = require("../models/user");

const { body, validationResult } = require("express-validator");

// Display admin form on GET.
exports.admin_get = function (req, res, next) {
    res.render('admin', { title: 'Become an admin' });
};

exports.admin_post = [

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
            res.render("admin", {
                title: "Become an admin",
                //user: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            console.log(req.body);
            if (req.body.password === process.env.ADMIN_SIGNUP) {

                var user = new User({
                    username: app.locals.currentUser.username,
                    password: app.locals.currentUser.password,
                    avatar: app.locals.currentUser.avatar,
                    status: 'member',
                    admin: true,
                    _id: app.locals.currentUser._id,
                })
                // Update user record
                User.findByIdAndUpdate(
                    app.locals.currentUser._id,
                    user,
                    {},
                    function (err) {
                        if (err) {
                            return next(err);
                        }
                        // Successful!
                        req.session.msg = 'You are an admin. You are able to delete messages.';
                        res.redirect('/');
                        //res.render('index', { title: 'admins Only', msg, error: false });
                    }
                );
                //res.render('index', { title: 'admins Only', msg });

            } else {
                //res.send('Wrong! try again!!');
                let msg = `Incorrect password.`;
                res.render('admin', { title: 'Become an admin', msg });
            }
        }
    }
]
