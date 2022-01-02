var Message = require('../models/message');

// Display list of all messages.
exports.index_get = function (req, res, next) {
  var msg = req.session.msg;

  Message.find({})
    .sort({ timestamp: -1 })
    .populate("user")
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("index", {
        title: "Members Only",
        message_list: list_messages,
        //msg,
      });
    });
};

