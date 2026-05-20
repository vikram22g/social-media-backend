const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type: String
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, {timestamps: true})

// ye hamare data ko database me store karene ki schema hai ki hamara data database kaise store hoga or kis format me hoga
const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    caption: {
        type: String
    },
    image: {
        type: String
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [commentSchema]
}, {timestamps: true});


const postModel= mongoose.model("post", postSchema) // learning......

module.exports = postModel;