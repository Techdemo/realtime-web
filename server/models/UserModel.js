const mongoose = require('mongoose')

const UserSchema = new mongoose.Scheme({
    username: {
        type: String,
        required,
        trim,
        lowercase,
    }, 
    password: {
        type: String,
        required,
        trim,
    },
}); 

const User = Mongoose.model("User", UserSchema);
module.exports = User;