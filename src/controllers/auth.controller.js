// api ka logic likhne ke liye is folder ka use hota hai

const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

async function registerUser(req , res){
    const {username , email , password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username , email , password: hashedPassword
    })
    
     // create token
      const token = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: "7d" }
      );

      // store token in cookie
      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax"
      });
 
    res.status(201).json({
        massage: "user registered successfully",
        user, 
    })
}

async function loginUser(req, res){
       try {

      const { email, password } = req.body;

      // check user
      const user = await userModel.findOne({ email });

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found"
         });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password)
      console.log(user.password)

      if (!isMatch) {
         return res.status(400).json({
            success: false,
            message: "Invalid credentials"
         });
      }

      // create token
      const token = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: "7d" }
      );

      // store token in cookie
      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax"
      });

      res.status(200).json({
         success: true,
         message: "Login successfully"
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });
   }
}

async function cookietest(req ,res){
     console.log("cookie", req.cookies)
    await res.json({
        massage: "cookie test",
        cookie: req.cookies 

    })
}

async function logoutUser(req, res){ 
    res.clearCookie("token", {
    httpOnly: true,
    secure: true
});

    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
}
 
 
async function getMe(req, res){

   const user = await userModel.findById(req.user.id)

   res.status(200).json({
      success: true,
      user
   })

}


module.exports = { registerUser , cookietest , loginUser , logoutUser , getMe } 