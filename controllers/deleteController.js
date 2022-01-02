var Message = require("../models/message");

const { body, validationResult } = require("express-validator");

// Display delete form on GET.
exports.delete_get = function (req, res, next) {

  console.log(req.params);

  Message.findById(req.params.id)
    .populate("user")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.msgTitle == null) {
        // No results.
        var err = new Error("Product not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("delete", { title: results.title, results });
    });

  //res.render('delete', { title: 'Delete Message' });
};

// Display delete form on POST.
exports.delete_post = function (req, res, next) {

  const deleteConfirm = req.body.delete;
  console.log(deleteConfirm);

  if (deleteConfirm == 'yes') {
    //action for delete message
    console.log('deleting now................');
    console.log(req.params.id);
    Message.findByIdAndRemove(req.params.id, function deletemessage(err) {
      if (err) {
        return next(err);
      }
      // Success, so redirect to list of product items.
      res.redirect('/');
    });

  } else if (deleteConfirm == 'cancel') {
    //action for cancel
    res.redirect('/');
  } else {
    console.log('--Something went wrong!--');
    res.redirect('/');
  }
  //res.render('delete', { title: 'Delete Message' });
};
