import React,{useState,useEffect} from 'react';
import InputBase from '@mui/material/InputBase';
import { AppBar,Toolbar,Typography,styled,Button,alpha,Box } from '@mui/material'
import { API } from '../../../service/api';
import{useNavigate} from 'react-router-dom'

const StyledInputBase = styled(InputBase)`
background:#f0f0f0;
color:#0a0a0a;
width:100%;
padding-left:15px;
border-radius:20px;

// z-index:-1;
`;
const SearchR=styled(Box)`
background:#e6e6e6;
margin-top:10px;
max-height:180px;
border-radius:10px;
overflow-y:scroll;
position:absolute;
`;
export default function SearchFriend({currentUserId}) {
  const[input,setInput]=useState('')
  const[allUser,setAllUser]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
      const getUser=async()=>{
           let res=await API.getAllUser();
           if(res.isSuccess){
              setAllUser(res.data)
              //console.log(res.data)
           }
      }
      getUser();
  },[])
  function sorting(val){
   if(input==="")
        return ;
    else if(val.name.toLowerCase().includes(input.toLowerCase()))
     return val;
     else{
        let wordsTypedByTheUser = input.toLowerCase().split(' ');
        return wordsTypedByTheUser.every(word => val.name.toLowerCase().includes(word));
     }
}

const newConversation=async(toUserId)=>{
  const conv={
    senderId:currentUserId,
    receiverId:toUserId
  }
  let res=await API.newConversation(conv);
           if(res.isSuccess){
              console.log(res.data)
              setInput('')
           }
}
function reload(){
  navigate(0)
}
  return (
   <div >
      <StyledInputBase
    
          placeholder="Search friends..."
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
        />
         <SearchR >
          {
            allUser && allUser.filter((val)=>sorting(val)).map(pos=>(
              <div key={pos._id}style={{paddingLeft:20,paddingRight:30,paddingTop:10,cursor:'pointer'}}>
                  <div  onClick={()=>{newConversation(pos._id);reload();}}>{pos.name}</div>
              </div>
          ))
       }
      </SearchR>
   </div>
  )
}
