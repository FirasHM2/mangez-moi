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
        type: String,
        default: "user"
    },
    googleId: String,
    facebookId: String,
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password is incorrect',
        IncorrectUsernameError: 'Email is incorrect',
        MissingUsernameError: 'No email was given',
        UserExistsError: 'A user with the given email is already registered'
    }
});
UserSchema.plugin(findOrCreate);

var User = mongoose.model("User", UserSchema);
module.exports = User;