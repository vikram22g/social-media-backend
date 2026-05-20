const express = require('express')
const multer = require('multer') // ye package files ko read karne ke kaam ata hai jaise images

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const uploadFile = require('./services/storage.service')
const cors = require("cors")

const cookieParser = require('cookie-parser')
const upload = multer({storage: multer.memoryStorage()}) // to read files like image


const app = express()
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)


module.exports= app