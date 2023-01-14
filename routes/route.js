import express  from "express";
import {signupUser ,loginUser}from "../controller/userController.js";
import { uploadImage,getImage } from "../controller/image-controller.js";
import { createPost,getAllPosts,getPost,updatePost,deletePost} from "../controller/post-controller.js";
import { newComment,getComments,deleteComment} from "../controller/comment-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from '../utils/upload.js'

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);//2nd argument "upload.single()" is middleware.
router.get('/file/:filename',getImage)
router.post('/create',authenticateToken, createPost)
router.get('/posts',authenticateToken,getAllPosts)
router.get('/post/:id',authenticateToken,getPost)
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost)
router.post('/comment/new',authenticateToken,newComment)
router.get('/comments/:id',authenticateToken,getComments)
router.delete('/comment/delete/:id',authenticateToken,deleteComment)


export default router;