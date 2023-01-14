import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    createDate:{
        type:Date
        
    }
})
const User= mongoose.model('postData',postSchema);
export default User;
