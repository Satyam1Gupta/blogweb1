import Jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
import {OAuth2Client} from 'google-auth-library';

dotenv.config();


export const authenticateToken=(req,res,next)=>{
   const authHeader=req.headers['authorization'];
   const token=authHeader
   
  //console.log(token)
   if(!token)
   {
    return res.status(401).json({msg:"token is missing"})
   }
   const isCustomAuth = token.length < 500;
   //BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E5MmMxZTM0YzI0NDQ0NWZhNDI3ZTkiLCJuYW1lIjoic2F0eWFtayIsInVzZXJuYW1lIjoic2tnIiwicGFzc3dvcmQiOiIkMmIkMDUkMzJjZXVvQklZQWxKZVZhSWptemdELnRqNlU0aGFJTmVYWUMyOE45VHdrcXF2dEpNRFhUS1ciLCJfX3YiOjAsImlhdCI6MTY3MjUyOTc2MCwiZXhwIjoxNjcyNTMwNjYwfQ.DrbIJyl1di65yYiBcRVz4BbSDPOm7NfZdvvtYKMmwqA
    if(isCustomAuth){
        Jwt.verify(authHeader,process.env.access_secret_key, (error,user)=>{
            if(error){
                return res.status(403).json({msg:'invalid token'})
            }
            req.user=user;
            next();
           })
    }else{
        const client = new OAuth2Client(process.env.CLIENT_ID);
        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience:process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        }
        verify().catch(console.error);   
        next(); 
    }
}