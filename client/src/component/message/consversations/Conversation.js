import React, { useEffect, useState } from 'react'
import "./conversation.css"
import { API } from '../../../service/api'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Conversation({conversation,currentUserId}) {

  //const userImg=sessionStorage.getItem('userImg');
  const ivalue={name:""}
  const [user,setUser]=useState(null)
  // console.log(conversation)
  // console.log(conversation._id)
  // console.log(conversation.members)
  //console.log(conversation._id)

  useEffect(()=>{
    const friendId=conversation.members.find(m=> m!==currentUserId)
    // console.log("fc" ,conversation)
    // console.log("frien" ,friendId)
    const getUser=async()=>{
      let res=await API.getUserById({_id:friendId});
     // console.log(res)
      if(res.isSuccess){
         setUser(res.data);
        
      } 
    }
    getUser();
  },[conversation,currentUserId]);

//console.log(user)
  return (
    <div className='conversation'>
    
       {
        user?.userImage ?
       <>
        <img 
        className='convImg'
        src={user?.userImage}
        />
       </>: <AccountCircleIcon fontSize="large" style={{marginRight:15}}/>
       }
        <span className='conName'>{user?.name}</span>
    </div>
  )
}
