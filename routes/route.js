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
router.get('/posts',getAllPosts)
router.get('/post/:id',getPost)
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost)
router.post('/comment/new',authenticateToken,newComment)
router.get('/comments/:id',getComments)
router.delete('/comment/delete/:id',authenticateToken,deleteComment)
// router.put('/comment/edit/:id',authenticateToken,editComment)


export default router;