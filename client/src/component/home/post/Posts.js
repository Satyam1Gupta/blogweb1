
import React, { useEffect,useState } from 'react'
import{API} from '../../../service/api';
import { Box ,Grid} from '@mui/material';
import Post from './Post';
import { useSearchParams,Link } from 'react-router-dom';

export default function Posts() {

    const[post,setPost]=useState([]);
    
    const[searchParams]=useSearchParams();
    const category=searchParams.get('category');
    //1console.log(category)

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

  return (
   <>
       {
          post && post.length>0 ? post.map(pos =>(
            <Grid item lg={3} sm={3} xs={12} key={pos._id} >
            <Link  to={`post/${pos._id}`} style={{textDecoration:'none',color:'inherit'}}>
            <Post post={pos}/>
            </Link>
            </Grid>
           
          )): <Box style={{color:'#878787', margin:'30px 80px',fontSize:18}}>No data to display! </Box>
       }
    
    </>
  )
}
