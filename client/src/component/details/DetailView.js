
import React,{useState,useEffect,useContext} from 'react'
import { Box,Typography,styled,Grid }from '@mui/material'
import{useParams,Link, Navigate,useNavigate} from 'react-router-dom'
import { API } from '../../service/api';
import{Edit,Delete} from '@mui/icons-material'
import {DataContext} from '../../context/DataProvider'
import Comments from './comments/Comments';
import Sidebar from './Sidebar';
import DOMPurify from 'dompurify'
import Contents from './Recommentdation/Contents';

const Container=styled(Box)(({theme})=>({
  justifyContent:'center',
  paddingLeft:'60px',
  margin:'25px 30px 0 0px',
  [theme.breakpoints.down('sm')]:{
    margin: 0,
    padding:10
  }
}));

const Image=styled('img')({
    width: '100%',
    objectFit:'cover',
    height:'55vh'
})
const Text=styled(Box)`
color:#878787;
margin:20px 0;
display:flex;

`;
const Heading=styled(Typography)`
font-weight:550;
font-size:38px;
text-align:center;
margin:0px 0 20px 0;
word-break:break-word;`;
const Desc=styled(Typography)`
fornt-size:14px;
word-break:break-word;
`;
const EditIcon=styled(Edit)`

margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
`;
const DeleteIcon=styled(Delete)`
margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
`;

export default function DetailView() {

  const username=sessionStorage.getItem('userName');
    const {id}=useParams();
    const[post,setPost]=useState({});
    const{acount}=useContext(DataContext);
    const navigate=useNavigate()
    
    //On render it will show the top of detailview
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    useEffect(()=>{
        const fetchData=async()=>{
          const res=await API.getPostById(id);
          if(res.isSuccess){
            setPost(res.data)
          }
        }
        fetchData();
    },[])
   
   const deleteBlog=async()=>{
    let res=await API.deletePost(post._id);  
    if(res.isSuccess){
      navigate('/')
    }
   }
   let user_name=post.name?post.name:post.username;
    const url=post.picture?post.picture:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    return (
     <>
     <Grid container>
    
     <Grid item lg={9} sm={9} xs={12}>
       <Container>
         <Heading>{post.title}</Heading>
          <Image src={url} alt='blog'/>
         {
            username===post.username &&
             <Box sx={{float:'right'}}>
               <Link to={`/update/${post._id}`}> <EditIcon color='primary' fontSize="medium"/></Link>
                <DeleteIcon fontSize="medium" onClick={()=>deleteBlog()} color='error' />
             </Box>
         }
         
         <Text style={{marginTop:'50px'}}>
            <Typography>Author:<Box component='span' style={{fontWeight:600}}>{user_name}</Box></Typography>
            <Typography style={{marginLeft:'auto'}}>{new Date(post.createDate).toDateString()}</Typography>
         </Text>
          {/* <Desc>{post.description}</Desc> */}
          <Desc dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.description)}}></Desc>
          <Comments post={post}/>
      </Container>
     </Grid>
     <Grid item lg={3} sm={3} xs={12}>
      {/* <Sidebar/> */}
      <Contents cat={post.categories}/>
      </Grid>
      </Grid>
     </>
    )
}
