import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const connection=async(DB)=>{
    
    
   await mongoose.connect(DB).then(()=>{
    console.log("connection successfull");
}).catch(()=>{
    console.log("Error connecetion")
})

}
export default connection;

