const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


const authMiddleware = (req, res, next) => {

    try {

        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Nzg4MjQ3ODJ9.jLMdckCJAy1wW3nPPpZebBuLRQp_NHmSL2pWJ5Ozyss";
        console.log(req.cookies)
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;