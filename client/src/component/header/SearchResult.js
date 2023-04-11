import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import{API} from '../../service/api';
import{useNavigate} from 'react-router-dom'

export default function SearchResult({input}) {

    const navigate=useNavigate();
    const[post,setPost]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
             let res=await API.getAllPosts('');
             if(res.isSuccess){
                setPost(res.data)
             }
        }
        fetchData();
    },[])
    //console.log(post)
    function sorting(val){
        // const s1=val.title.toLowerCase().split(" ")
        // const s2=input.toLowerCase().split(" ")
        // console.log(s1+" "+ s2)
       
        if(input==="")
            return ;
        else if(val.title.toLowerCase().includes(input.toLowerCase()))
         return val;
         else{
            // let s= input.toLowerCase().split(" ").filter(item =>val.title.toLowerCase().split(" ").includes(item))
            // console.log(s)
            let wordsTypedByTheUser = input.toLowerCase().split(' ');
            return wordsTypedByTheUser.every(word => val.title.toLowerCase().includes(word));
         //return val;
        
         }
    }
    function redirect(pos_id){
        navigate(`/post/${pos_id}`)
    }
    function reload(){
        navigate(0);
    }
  return (
    <>
    {
        post && post.filter((val)=>sorting(val)).map(pos=>(
            <div key={pos._id}style={{paddingLeft:20,paddingRight:10,paddingTop:10}}>
                <Link onClick={()=>{redirect(pos._id);reload();}} style={{textDecoration:'none',color:'inherit'}}>{pos.title}</Link>
            </div>
        ))
    }
    </>
  )
}
