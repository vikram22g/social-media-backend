require('dotenv').config(); 
const app = require('./src/app')
const connectDB = require('./src/db/db')
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const dns = require('dns')
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

connectDB()





app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})