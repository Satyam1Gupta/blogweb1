import mongoose from "mongoose";
const messageSchema=mongoose.Schema({
    conversationId:{
        type:String,  
    },
    senderId:{
        type:String,  
    },
    text:{
        type:String,  
    },
},
{ timestamps: true})
const message= mongoose.model('message',messageSchema);
export default message;
