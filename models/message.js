var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    msgTitle: { type: String, required: true, maxLength: 20 },
    timestamp: { type: String, required: true },
    text: { type: String, required: true, minLength: 1, maxLength: 100},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
