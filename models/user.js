var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 15 },
    password: { type: String, required: true, minLength: 6 },
    avatar: { type: String, required: true },
    status: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
