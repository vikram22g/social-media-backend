const express = require('express')
const userController = require("../controllers/user.controller")
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()


router.get('/user-profile/:id', userController.userProfile)
router.put('/edit-profile', authMiddleware, userController.editProfile)
router.put('/follow/:id', authMiddleware, userController.followUser)
router.get('/search', userController.searchUser) 

module.exports= router