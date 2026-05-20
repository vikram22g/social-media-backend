const postController = require('../controllers/post.controller')
const express = require("express")
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()}) // to read files like image

const router = express.Router()

router.post('/create-post',authMiddleware , upload.single("image"),  postController.createPost)
router.get('/post', postController.allPosts)
router.get('/my-posts' , authMiddleware, postController.myPosts)
router.get('/post/:id', postController.openPost)
router.delete('/delete-post/:id' , authMiddleware, postController.deletePost)
router.put('/post/like/:id' , authMiddleware, postController.likePost)
router.put('/post/unlike/:id' , authMiddleware, postController.unlikePost)
router.post('/post/comment/:id' , authMiddleware, postController.commentOnPost)
router.put('/comment/like/:pid/:cid' , authMiddleware, postController.commentLike)
router.put('/comment/unlike/:pid/:cid' , authMiddleware, postController.commentUnlike)

module.exports= router