const jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
const authHeader=req.headers.authorizion||req.headers.Authorizion

if(!authHeader?.startsWith("bearer ")){
    res.status(400).json({message:"Unauthorized"})
}
const token=authHeader.split(' ')[1]

jwt.verify(
    token,
    process.env.Access_TOKEN_SECRETE,
    (err,decoded)=>{
        if(err) return res.status(401).json({message:"Forbidden"})
            req.user=decoded
            next()
    }
)
}
module.exports= verifyJWT