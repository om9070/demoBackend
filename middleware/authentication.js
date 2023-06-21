
const jwt=require("jsonwebtoken")
const user=require("../model/user")

const auth=async(req,res,next)=>{
  try{
const header=req.headers.authorization.split(" ")[1];
const varifyUser=jwt.verify(header,process.env.adminjwt);
const findUser=await user.findOne({where:{
  id:varifyUser.id
}})
if(findUser){
req.currentData=findUser;
next()
}else{
  res.status(401).send({message:"authentication faild",status:0})
}
  }catch(e){
    res.status(401).send({message:"authentication faild",status:0})
    console.log("authentication error",e)
  }
}
module.exports=auth;