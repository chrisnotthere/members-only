//var async = require("async");
var User = require("../models/user");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

// Display user create form on GET.
exports.member_get = function (req, res, next) {
  res.render('member', { title: 'Become a member of Members Only' });
};

exports.member_post = function (req, res, next) {
    res.send('NOT IMPLEMENTED YET: member post');
}