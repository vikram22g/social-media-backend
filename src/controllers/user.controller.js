const postModel = require('../models/post.model');
const userModel = require('../models/user.model')// to post data on database this is model
const jwt = require("jsonwebtoken")


async function userProfile(req, res) {
    try {

        const user = await userModel.findById(req.params.id);

        const posts = await postModel.find({
            user: req.params.id
        });

        res.json({
            user,
            posts
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
}

async function editProfile(req, res) {
    try {

        const { name, username, bio, profilePic } = req.body;

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.profilePic = profilePic || user.profilePic;

        await user.save();

        res.json({
            message: "Profile updated",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"

        });

    }
}

async function followUser(req, res) {

    try {

        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        // khud ko follow na kare
        if (currentUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const currentUser = await userModel.findById(currentUserId);

        const targetUser = await userModel.findById(targetUserId);

        // already follow check
        if (currentUser.following.includes(targetUserId)) {
            return res.status(400).json({
                message: "Already following"
            });
        }

        // add following
        currentUser.following.push(targetUserId);

        // add follower
        targetUser.followers.push(currentUserId);

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({
            success: true,
            message: "User followed successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

async function searchUser(req, res) {
    try {
        const query = req.query.name;

        const user = await userModel.find({
            username: {
                // to search the user with name even user searched wrong spelling and in any case like uppercase or lowercase
                $regex: query,
                $options: "i"
            }
        })

        if (user.length < 1) {
            return res.status(404).json({
                message: "user not found"
            })

        }
        console.log(query)
        res.status(200).json({
            message: "search done",
            query,
            user

        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = { userProfile, editProfile, followUser, searchUser }