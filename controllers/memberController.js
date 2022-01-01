var User = require("../models/user");
//const bcrypt = require("bcryptjs");

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
            if (req.body.password === process.env.MEMBER_SIGNUP) {
                //res.send('success! correct password');
                let msg = `Congratulations! You are now an exclusive member. You are now able to post messages.`;
                app.locals.currentUser.username.toString = function () { return JSON.stringify(this); };
                app.locals.currentUser._id.toString = function () { return JSON.stringify(this); };

                console.log(`username -- ${app.locals.currentUser.username}`);
                console.log(`_id -- ${app.locals.currentUser._id}`);

                //TODO update user status to 'member
                var user = new User({
                    username: app.locals.currentUser.username,
                    password: app.locals.currentUser.password,
                    avatar: app.locals.currentUser.avatar,
                    status: 'member',
                    _id: app.locals.currentUser._id,
                    //id: app.locals.username._id
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
                        res.redirect('/');
                        //res.render('index', { title: 'Members Only', msg });
                    }
                );
                //res.render('index', { title: 'Members Only', msg });

            } else {
                //res.send('Wrong! try again!!');
                let msg = `Incorrect password.`;
                res.render('member', { title: 'Members Only', msg });
            }
        }
    }
]
