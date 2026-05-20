const mongoose = require('mongoose');
const { applyTimestamps } = require('./post.model');

const userSchema = mongoose.Schema({
    
    name: {
        type: String
    },

    username: {
        type: String, 
        unique: true
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    bio: {
        type: String,
        default: ""
    },

    profilePic: {
        type: String,
        default: ""
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true});

const userModal = mongoose.model("user", userSchema)

module.exports = userModal;