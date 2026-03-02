const jwt=require("jsonwebtoken");
const { JWT_SECREATE } = require("../config");

const authcandidatemiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(403).json({
            message:"invalid authorization header"
        });
    }
    const token=authHeader;
    try{
     const decoded=jwt.verify(token,JWT_SECREATE);
     if(decoded?.id){
        req.id=decoded.id;
        return next();
     }
    }catch(err){
    return res.status(403).json({
        message:"invalid or expaired token"
    })
 }
}
module.exports={
    authcandidatemiddleware
}