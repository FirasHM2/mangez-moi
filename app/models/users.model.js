var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    passportLocalMongoose = require("passport-local-mongoose"),
    findOrCreate = require("mongoose-findorcreate");

var UserSchema = new Schema({
    name: String,
    password: String,
    email: {
        type: String,
        index: true
    },
    role: {
        type : String,
        default: "user"
    },
    googleId: String,
    facebookId: String,
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    errorMessages: {
        IncorrectPasswordError: "Password incorrect",
        IncorrectUsernameError: "There is no account registered with that email",
        UserExistsError: "A user with the given email is already registered"
    }
});
UserSchema.plugin(findOrCreate);

var User = mongoose.model("User", UserSchema);
module.exports = User;