const express = require("express")
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();


router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser)
router.get("/me", authMiddleware, authController.getMe)


// api to to check cookie working perfactly on 
router.get("/test", authController.cookietest)


module.exports= router