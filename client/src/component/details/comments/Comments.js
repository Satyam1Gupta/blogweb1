import React,{useState,useContext,useEffect} from 'react'
import { Box,styled, TextareaAutosize, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DataContext } from '../../../context/DataProvider'
import{API} from '../../../service/api'
import Comment from './Comment'

const Container=styled(Box)`
margin-top:100px;
display:flex;
`
const Image=styled('img')({
    width:40,
    height:45,
    borderRadius:'50%'
})
const StyleTextareaAutosize=styled(Box)`

width:50%;
margin: 0 20px;
border:none
`

const initialValues={
    name:'',
    userName:'',
    postId:'',
    comments:'',
    date:new Date()
}
export default function Comments({post}) {
  
  const username=sessionStorage.getItem('userName');
  const name=sessionStorage.getItem('name');
   const[comment,setComment]=useState(initialValues);
   const[comments,setComments]=useState([]);
   const{acount}=useContext(DataContext)
   const[toggle,setToggle]=useState(false);

   useEffect(()=>{
    const getData=async()=>{
     let res=await API.getAllComments(post._id)
     if(res.isSuccess){
        setComments(res.data)
     }
    };
    getData();
   },[post,toggle ])

   const handleChange=(e)=>{
        setComment({...comment,
             name:name,
             userName:username,
             postId:post._id,
             comments:e.target.value,
             date:new Date()
            })
   }

   const addComment=async()=>{
     let res=await API.newComment(comment);
     if(res.isSuccess){
        setComment(initialValues);
        
     }
     setToggle(prevState=> !prevState);
   }
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    
  return (
    <Box>
      <Container>
        {/* <Image src={url} alt='dp'/> */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end',width: '75%' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField 
           sx={{width: '100%'}} 
          placeholder="Add a comment" 
          variant="standard" 
          value={comment.comments}
          onChange={(e)=>{handleChange(e)}}
          />
       </Box>
        {/* <StyleTextareaAutosize 
        minRows={1}
        placeholder="Add a comment" 
        value={comment.comments}
        onChange={(e)=>{handleChange(e)}}
        /> */}
        <Button variant='contained' color='primary'
         size='medium' style={{height:30}}
         onClick={()=>addComment()} >
            Comment
        </Button>
      </Container>
      <Box>
         {
             comments.length>0 && comments.reverse().map((comment)=>(
                    <Comment key={comment._id} comment={comment} setToggle={setToggle}/>
             ))
         }
      </Box>
    </Box>
  )
}
