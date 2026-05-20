const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


const authMiddleware = (req, res, next) => {

    try {

        console.log(req.cookies)
        const token = req.cookies?.token; 

        //to handle if there is no token or user not logged in
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded; 
        next();

    } 
    catch (error) { 
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        }); 
    }

};

module.exports = authMiddleware;