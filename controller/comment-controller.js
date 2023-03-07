

import Comment from "../model/comment.js"
export const newComment=async(req,res)=>{
   try{
    const comment=await new Comment(req.body);
    comment.save();
    res.status(200).json({msg:'Comment saved successfully'})

   }catch(error){
     res.status(500).json({msg:error.message})
   }
}
export const getComments=async(req,res)=>{
   try{
      const comments=await Comment.find({postId:req.params.id})
    res.status(200).json(comments)

   }catch(error){
     res.status(500).json({msg:error.message})
   }
}
export const deleteComment=async(req,res)=>{
   try{
      const comment=await Comment.findById(req.params.id);
      await comment.delete();
    res.status(200).json({msg:'Comment deleted successfully'})

   }catch(error){
     res.status(500).json({msg:error.message})
   }
}

// export const editComment=async(req,res)=>{
//   try{
//      const post=await Comment.findById(req.params.id);
//      if(!post){
//       return res.status(404).json({msg:'comment does not found in the database'})
//      }
//      await post.findByIdAndUpdate(req.params.id,{$set:req.body})// $set-->to replace the object, $addToSet-->to append the object
//      return res.status(200).json({msg:'Post upadated successfully'})
//   }catch(error){
//       return res.status(500).json({msg:error.message})
//   }
// }