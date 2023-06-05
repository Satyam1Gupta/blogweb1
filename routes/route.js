import express  from "express";
import {signupUser ,loginUser,googleSignup,getUserById,getAllUser}from "../controller/userController.js";
import { uploadImage,getImage } from "../controller/image-controller.js";
import { createPost,getAllPosts,getPost,updatePost,deletePost} from "../controller/post-controller.js";
import { newComment,getComments,deleteComment} from "../controller/comment-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from '../utils/upload.js'
import { newConversation,getConversation,postMessage,getMessage } from "../controller/conversation-controller.js";

const router=express.Router();

router.post('/signup',signupUser);
router.post('/google_signup',googleSignup);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);//2nd argument "upload.single()" is middleware.
router.get('/file/:filename',getImage)
router.post('/create',authenticateToken, createPost)
router.get('/posts',getAllPosts)
router.get('/post/:id',getPost)
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost)
router.post('/comment/new',authenticateToken,newComment)
router.get('/comments/:id',getComments)
router.delete('/comment/delete/:id',authenticateToken,deleteComment)
router.post('/message_user',newConversation)
router.get('/message_get_user/:userId',getConversation)
//router.get('/message_get_user',getConversation)
router.get('/get_user/:userId',getUserById)
router.get('/get_messages/:conversationId',getMessage)
router.post('/post_messages',postMessage)
router.get('/get_all_user',getAllUser)
// router.put('/comment/edit/:id',authenticateToken,editComment)


export default router;