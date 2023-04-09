import React, { useContext } from 'react'
import { Box, styled ,FormControl, InputBase, Button,TextareaAutosize} from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState,useEffect,useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider'
import { API } from '../../service/api'
import JoditEditor from 'jodit-react'
import './app.css'

const Container=styled(Box)(({theme})=>({
    margin:'50px 100px',
    [theme.breakpoints.down('sm')]:{
      margin: 0
    }
  }));
const Image=styled('img')`
width:100%;
height:50vh;
objectFit:cover
`
const StFormctrl=styled(FormControl)`
margin-top:10px;
display:flex;
flex-direction:row;`
const InputTextField=styled(InputBase)`
flex:1;
margin:0 30px;
font-size:30px`
const Textarea=styled(TextareaAutosize)`
width:100%;
margin-top:50px;
font-size:18px;
border:none;
&:focus-visible{
    outline:none;
}
`
const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    name:'',
    categories:'',
    createDate:new Date()
};
const config={
    buttons:["bold","italic","link",'ul','ol','image','paragraph','fullsize']
}
export default function CreatePost() {
    
    const [post,setPost]=useState(initialPost);
    const[file,setFile]=useState('');
    const location=useLocation();
    const navigate=useNavigate();
    const {acount}=useContext(DataContext);
    const editor=useRef(null)
    //const[content,setContent]=useState('')
    const username=sessionStorage.getItem('userName');
    const name=sessionStorage.getItem('name');

    
    
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
       
    }
    const handleChang=(key,val)=>{
        setPost({...post,[key]:val})
       
    }

    const savePost=async()=>{
       const res=  await API.createPost(post);
       if(res.isSuccess){
        navigate('/')
       }
    }

    useEffect(()=>{
        const getImage=async()=>{
            if(file){
                const data=new FormData();
                data.append('name',file.name);
                data.append('file',file);
                 //API CALL
                 console.log(file);
                 const response= await API.uploadFile(data);

                post.picture=response.data;
            }
        }
        getImage();
       post.categories=location.search?.split('=')[1] || 'all';
       //post.username=acount.username;
      post.username= username
      post.name= name
    },[file])
console.log(post)
    const url=post.picture?post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    
    return (
    <Container>
         <Image src={url} alt='banner'/>
         <StFormctrl encType='multipart/form-data'>
            <label htmlFor='fileInput'>
                <ControlPointIcon fontSize='large' color='action'/>
            </label>
            <input type="file" name='file'  id="fileInput" style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
            <InputBase placeholder='Title'onChange={(e)=>handleChange(e)} name='title'/>
            <Button variant='contained' onClick={()=>savePost()}>
                Publish
            </Button>
         </StFormctrl>
         {/* <Textarea 
         minRows={5}
         placeholder='Tell me your story.....!'
         onChange={(e)=>handleChange(e)} name='description'
         /> */}
         <JoditEditor
         style={{visibility:"hidden"}}
         name='description'
         ref={editor}
         value={post.description}
         config={config}
         onChange={(val)=>handleChang('description',val)} 
         />
    </Container>
  )
}
