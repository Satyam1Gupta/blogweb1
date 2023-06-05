import Conversation from "../model/conversation.js"
import Message from "../model/message.js"

export const newConversation=async(req,res)=>{
    const conv= new Conversation({
        members : [req.body.senderId,req.body.receiverId],
    });
   try{
   
    const savedConv=await conv.save();
    res.status(200).json(savedConv)
 
   }catch(error){
     res.status(500).json({msg:error.message})
   }
}
export const getConversation=async(req,res)=>{

   try{
    const conv=await Conversation.find({
        members:{$in:[req.params.userId]}, 
    });
   // console.log(req.params.userId)
    res.status(200).json(conv)
 
   }catch(error){
     res.status(500).json({msg:error.message})
   }
}
export const postMessage=async(req,res)=>{
const newMessage=new Message(req.body)
   try{
    const savedMsg=await newMessage.save()
    res.status(200).json(savedMsg)
 
   }catch(error){
     res.status(500).json({msg:error.message})
   }
}
export const getMessage=async(req,res)=>{

   try{
    const messages=await Message.find({
        conversationId:req.params.conversationId, 
    });
    res.status(200).json(messages)
 
   }catch(error){
     res.status(500).json({msg:error.message})
   }
}