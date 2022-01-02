var User = require("../models/user");

const { body, validationResult } = require("express-validator");

// Display delete form on GET.
exports.delete_get = function (req, res, next) {
  res.render('delete', { title: 'Delete Message' });
};

// Display delete form on POST.
exports.delete_post = function (req, res, next) {

  const deleteConfirm = req.body.delete;
  console.log(deleteConfirm);

  if (deleteConfirm == 'yes') {
    //action for update here
    console.log('deleting now................');

  } else if (deleteConfirm == 'cancel') {
    //action for delete
    console.log('redirect back to homepage');

  } else {
    //invalid action!
    console.log('Something went wrong!');

  }
  
  res.render('delete', { title: 'Delete Message' });
  
};
