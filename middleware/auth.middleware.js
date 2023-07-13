const jwt = require("jsonwebtoken")
require("dotenv").config()
const authMiddleware=(req,res,next)=>{
    try{
    const token=req.headers.auth.split(" ")[1]
 const decode=jwt.verify(token,process.env.SECRET_KEY)
 if(decode){
    next()
 }
 else{
    res.status(400).json({msg:"please login"})
 }
}
catch(err){
    res.status(400).json({msg:err.message})
}

}
module.exports={
    authMiddleware
}