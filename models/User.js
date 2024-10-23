const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String, // beacuse it will hold img url
        default : ""
    }
}, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);

