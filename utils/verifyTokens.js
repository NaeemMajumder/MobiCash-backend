const jwt = require("jsonwebtoken");

const verifyTokens = (req,res,next)=>{
  console.log("INSIDE MIDDLE WARE: ", req.headers);
  if(!req.headers.authorization){
    return res.status(401).send({message:"forbidden access"});
  }
  const token = req.headers.authorization;
  jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded)=>{
    if(error){
      return res.status(401).send({message:"forbidden access"});
    }
    req.decoded = decoded;
    
    next();
  })
}

module.exports = verifyTokens;