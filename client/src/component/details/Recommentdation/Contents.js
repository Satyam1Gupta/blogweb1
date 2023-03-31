
import React, { useEffect,useState } from 'react'
import{API} from '../../../service/api';
import { Box ,Button,Grid} from '@mui/material';
import Content from './Content';
import { useSearchParams,Link } from 'react-router-dom';
import{useNavigate} from 'react-router-dom'

export default function Contents(props) {

    const[post,setPost]=useState([]);
    const navigate=useNavigate();
    // const[searchParams]=useSearchParams();
    // const category=searchParams.get('category');
    const category=props.cat;
    //console.log(category)

    useEffect(()=>{
        const fetchData=async()=>{
             let res=await API.getAllPosts({category:category||''});
             if(res.isSuccess){
                setPost(res.data)
             }
        }
        fetchData();
    },[category])
    //console.log(post)
function redirect(pos_id){
    navigate(`/post/${pos_id}`)
}
function reload(){
    navigate(0)
}
  return (
   <>
       {
          post && post.length>0 ? post.map(pos =>(
            // <Grid item lg={3} sm={3} xs={12} key={pos._id} >
            <Grid  key={pos._id} >
            <Link onClick={()=>{redirect(pos._id);reload();}} style={{textDecoration:'none',color:'inherit'}}>
            <Content post={pos}/>
            </Link>
            </Grid>
           
          )): <Box style={{color:'#878787', margin:'30px 80px',fontSize:18}}>No data to display! </Box>
       }
    
    </>
  )
}
