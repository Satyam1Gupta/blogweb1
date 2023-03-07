import User from '../model/user.js'
import Token from '../model/token.js'
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();

 export const signupUser= async(req,res)=>{
   //console.log(req.body);
 try{
  //  const salt = await bcrypt.genSalt(saltRounds);
const hashPassword = await bcrypt.hash(req.body.password, 5);//here 5=salt of 5 digits
// Store hash in your password DB.
 const user={
  name:req.body.name,
  username:req.body.username,
  password:hashPassword
 }
    //const user=req.body;
    const newUser=new User(user);
    await newUser.save();
    return res.status(200).json({msg:"signup successsful!"})
 }catch(error ){
return res.status(500).json({msg:"Error while signup user....!"})
 }
}
//export default signupUser;

export const loginUser=async(req,res)=>{
  let user=await User.findOne({username: req.body.username})
if(!user){
  return res.status(400).json({msg:"Username doesn't exist"})
}
try{
let match=await bcrypt.compare(req.body.password,user.password)

if(match){
//res.status(200).json({msg:"Successfully logged in"})
const accessToken=jwt.sign(user.toJSON(), process.env.access_secret_key,{expiresIn:'60m'});
const refreshToken=jwt.sign(user.toJSON(), process.env.refresh_secret_key);
const newToken=new Token({token:refreshToken})
await newToken.save();
return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})

}else{
  res.status(400).json({msg:"Passoword doesn't match"})
}

}catch(error){
res.status(500).json({msg:"Error while login"})
}
}


