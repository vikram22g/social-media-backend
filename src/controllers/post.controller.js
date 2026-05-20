const postModel = require('../models/post.model')// to post data on database this is model
const userModel = require('../models/user.model')
const { post } = require('../routes/auth.routes')
const uploadFiles = require('../services/storage.service')



async function createPost(req, res) {
    try {

        if(!req.file){
            return res.status(400).json({
                message: "must need file"
            })
        }

        if(!req.body.caption){
            return res.status(400).json({
                message : "please enter caption"
            })
        }

        const user = await userModel.findById(req.user.id)
        const result = await uploadFiles(req.file.buffer)
        console.log(user)

        const posts = await postModel.create({
            user: user._id,
            image: result.url,
            caption: req.body.caption
        })

        res.status(200).json({
            message: "post created successfully",
            posts
        })
    }catch(error){
        res.status(500).json({
            message: "post error",
            err: error.message
        })
    }
}

async function allPosts(req, res){
    try{

        const posts = await postModel.find()
        res.status(200).json({
            message: "all posts",
            posts: posts
        })
    }catch(error){
        res.status(500).json({
            message:"error",
            err: error.message
        })
    }
}

async function myPosts(req,res){
    try{

        // const user = req.user.id
        const posts = await postModel.find({
            user : req.user.id
        })
        // console.log(posts)
        res.status(200).json({
            message:"hello", 
            posts
        })
    }catch(error){
        res.status(500).json({
            message: "error in getting posts",
            err: error.message
        })
    }
}

async function openPost(req ,res){
    try{

        const id = req.params.id
        console.log(id)
        const post= await postModel.findById({
            _id: id
        })
        
        res.status(200).json({
            message: "post get successfully",
            post
        })
    }catch(error){
        res.status(500).json({
            message: "error in getting post",
            err: error.message
        })
    }
    
}

async function deletePost(req, res){
    try{
        const postid = req.params.id
        const user = req.user.id
        
        const post = await postModel.findById(postid) 

        if(post.user.toString() === user){
            const deletepost = await postModel.findOneAndDelete({
             _id: postid
            })
            res.status(200).json({
                message: "post deleted successfully"
            })
        }
        else{
            res.status(403).json({
                message: "you can only delete your own posts"
            })
        }

    }catch(error){
        res.status(500).json({
            message: "error",
            err: error.message

        })
    }
}

async function likePost(req ,res){
    try{


        const user = req.user.id
        const postid = req.params.id

        
        const post = await postModel.findById(postid)
        if(post.likes.includes(user)){
            return res.status(409).json({
                message: "you have liked this post already"
            })
        }
        if(!post){
            return res.status(404).json({
                message: "post not found"
            })
        }
        console.log(post.likes)
        post.likes.push(user)
        await post.save()

        res.status(200).json({
            message: "you liked this post",
            post
        })
    }
    catch(error){
        res.status(500).json({
            message: "erro occured",
            err: error.message
        })
    }
}

async function unlikePost(req ,res){

    try{

        const user = req.user.id
        const postid = req.params.id
        const post = await postModel.findById(postid)

        if(!post){
            return res.status(404).json({
                message: "post not found"
            })
        }
        
        post.likes.pull(user)
        await post.save()
        
        res.status(200).json({
            message: "unlike post successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "error occured",
            err: error.message
        })
    }
}

async function commentOnPost(req, res){
    try{
        const postid = req.params.id
        const user = req.user.id
        const post = await postModel.findById(postid)
        const {text}= req.body

        if(!post){
            return res.status(404).json({
                message: "post not avaliable"
            })
        }

        const commentData = {
            text,
            user
        }

        post.comments.push(commentData)
        await post.save()

        res.status(200).json({
            message: "commented successfully",
            post: post
        })


    }catch(error){
        res.status(500).json({
            message: "error occured",
            err: error.message
        })
    }
}

async function commentLike(req ,res){ 
    try{
        const postid = req.params.pid
        const commentid= req.params.cid
        const user = req.user.id
        const post = await postModel.findById(postid)
        const comment = post.comments.id(commentid)

        console.log(postid)
        console.log(commentid)
        console.log(user)

        if(comment.likes.includes(user)){
            return res.status(404).json({
                message: "already liked"
            })
        }

        if(!comment){
            return res.status(404).json({
                message: "comment not found"
            })
        }

        if(!post){
            return res.status(404).json({
                message: "post not found"
            })
        }
        comment.likes.push(user)
        await post.save()

        res.status(200).json({
            message: "comment liked successfully",
            post
        })
    }catch(error){
        res.status(500).json({
            message: "error",
            err: error.message
        })
    }
}

async function commentUnlike(req , res){
    try{
        const commentid= req.params.cid
        const postid = req.params.pid
        const user = req.user.id

        const post = await postModel.findById(postid)
        const comment = post.comments.id(commentid)

        if(!comment.likes.includes(user)){
            return res.status(404).json({
                massage: "you have not liked this comment"
            })
        }
        if(!post){
            return res.status(404).json({
                message: "post not found"
            })
        }
        if(!comment){
            return res.status(404).json({
                message: "comment not found"
            })
        }

        comment.likes.pull(user)
        await post.save()

        res.status(200).json({
            message: "comment unliked",
            post
        })
    }catch(error){
        res.status(500).json({
            message: "error aa gya",
            err: error.message
        })
    }
}
module.exports = { createPost , allPosts , myPosts , openPost , deletePost , likePost , unlikePost , commentOnPost , commentLike, commentUnlike}