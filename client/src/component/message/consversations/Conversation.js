import React, { useEffect, useState } from 'react'
import "./conversation.css"
import { API } from '../../../service/api'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Conversation({conversation,currentUserId,onlineUser}) {

  //const userImg=sessionStorage.getItem('userImg');
  const [user,setUser]=useState(null)
  const [isOnline,setIsOnline]=useState(false)
  // console.log(conversation)
  // console.log(conversation._id)
  // console.log(conversation.members)
  //console.log(conversation._id)

  useEffect(()=>{
    const friendId=conversation.members.find(m=> m!==currentUserId)
    // console.log("fc" ,conversation)
    // console.log("frien" ,friendId)
    const checkOnline=()=>{
      let u=onlineUser.find(o=>o.userId===friendId)
      u && setIsOnline(true)
    }
    const getUser=async()=>{
      let res=await API.getUserById({_id:friendId});
     // console.log(res)
      if(res.isSuccess){
         setUser(res.data);
        
      } 
    }
    getUser();
    checkOnline();
  },[conversation,currentUserId]);
console.log(isOnline)
//console.log(user)
  return (
    <div className='conversation'>
      <div className="OnlineImgContainer">
        {
          user?.userImage ?
        <>
          <img 
          className='convImg'
          src={user?.userImage}
          />
        </>: <AccountCircleIcon fontSize="large" />
        }
     {
      isOnline &&
      <div className="chatOnlinBadge"></div>
     }
      </div>
        <span className='convName'>{user?.name}</span>
    </div>
  )
}
