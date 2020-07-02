var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName : String,
    lastName: String,
    email: String,
    password: String
});

var User = mongoose.model("User", UserSchema);
module.exports = User;