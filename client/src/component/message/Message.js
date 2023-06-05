import React,{useState,useEffect, useRef} from 'react'
import io from 'socket.io-client'
import "./message.css";
import Conversation from './consversations/Conversation';
import Msg from './consversations/Msg';
import ChatOnline from './consversations/ChatOnline';
import{API} from '../../service/api'
import SearchFriend from './consversations/SearchFriend'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const socket=io.connect("http://localhost:8000");
export default function Message() {
    const[conversation,setConversation]=useState([]);
    const[currentChat,setCurrentChat]=useState(null);
    const[user,setUser]=useState(null);
    const[messages,setMessages]=useState([]);
    const[newMessages,setNewMessages]=useState('');
    const scrollRef=useRef();
    const[toggle,setToggle]=useState(true)
    const[size,setSize]=useState(window.innerWidth)
    const[isYourFriendOnline,setIsYourFriendOnline]=useState(false)
    const userId=sessionStorage.getItem('userId');
    
//console.log("h"+userId)
    //Chat by socket

    useEffect(()=>{
        socket.emit("add_user",userId)
        socket.on("get_users",(users)=>{
            // console.log(users)
            // console.log(user)
            if(users.find((u)=>u.userId===user?._id)){
                setIsYourFriendOnline(true)
                
            }
            else{
                setIsYourFriendOnline(false)
            }
            console.log(isYourFriendOnline);
        })
    },[newMessages])
   
    useEffect(()=>{
    socket.on("get_msg",(data)=>{
        console.log(data)
        setMessages((prev)=>[...prev,data]);
    })
    },[socket])

    //End of socket

        useEffect(()=>{
            const fetchData=async()=>{
                 let res=await API.getConversation({_id:userId})
                 
                 if(res.isSuccess){
                    setConversation(res.data);
                    //console.log("conver: "+res.data)
                 } 
            }
            fetchData(); 
        },[userId])
       // console.log(conversation)
        useEffect(()=>{
            const getMsg=async()=>{
                 let res=await API.getMessages({_id:currentChat?._id})
                 
                 if(res.isSuccess){
                    setMessages(res.data);
                    //console.log("Messages: "+res.data,)
                 } 
            }
            getMsg(); 
        },[currentChat])
      //console.log("currChat: ",currentChat)
    //   console.log(Array.isArray(messages))
    //   console.log(typeof messages)

    const handleSubmit=async(e)=>{
        //e.preventDefault();
        console.log("h")
        if(isYourFriendOnline){
            
            const msgData={
                senderId:userId,
                receiverId:user._id,
                text:newMessages,
                createdAt:Date.now()
            }
             socket.emit("send_msg",msgData)
           }

        const message={
            senderId:userId,
            text:newMessages,
            conversationId:currentChat._id
        }
        let res=await API.postMessages(message);
                 
                 if(res.isSuccess){
                    setMessages([...messages,res.data]);
                   // console.log(res.data)
                    setNewMessages("")
                 } 
                
      }
     
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

//handle responsive chatbox and all usersname component
    function resize() {
        setSize(window.innerWidth)
        //console.log(size);
      };
      window.onresize=resize;
      //console.log(input);
    function handleClick(){
      setToggle(false)
    }
// user name detail by id
const getUserDetail=async(conversation)=>{
    const friendId=conversation.members.find(m=> m!==userId)
    const getUser=async()=>{
      let res=await API.getUserById({_id:friendId});
     // console.log(res)
      if(res.isSuccess){
         setUser(res.data);
        
      } 
    }
    getUser();
}

  return (
  <div>
      {/* <div>Welcomt to message ....</div>
     
      <input type="text" placeholder='write your msg...' onChange={(e)=>{setMsg(e.target.value)}}/>
      <button onClick={sendMsg}>send msg</button> */}

      <div className="messenger">
        {
            (size>600 ||toggle)&&
            <div className="chatMenu">
            <div className="chatMenuWrapper">
           <SearchFriend currentUserId={userId}/>
            {
                conversation.map((c)=>(
                    <div onClick={()=>{setCurrentChat(c);handleClick();getUserDetail(c)}}key={c._id}>
                     <Conversation conversation={c}currentUserId={userId}  />
                   </div>
                ))
            }
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            </div>
        </div>
        }
        {
            (size>600 ||!toggle) &&
            <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    user &&
                    <div className='user'>
                        {
                            user.userImage ?
                         <>
                            <img 
                            className='convImg'
                            src={user?.userImage}
                            />
                        </>: <AccountCircleIcon fontSize="large" style={{marginRight:15}}/>
                         }
                        <span className='userName'>{user?.name}</span>
                    </div>
                }
                {currentChat ?
                    <>
                     <div className="chatBoxTop">
                        {
                            messages.map(m=>(
                               <div key={m._id} ref={scrollRef}>
                                <Msg message={m} own={m.senderId === userId} />
                               </div>
                            ))
                        }
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                        className='chatMsgInput' 
                        placeholder='Send your msg...'
                        onChange={(e)=>{setNewMessages(e.target.value)}}
                        value={newMessages}
                        ></textarea>
                        <button className='chatSubmitButton'onClick={()=>{handleSubmit()}}>Send</button>
                    </div>
                    </>: <span className='noConversation'>Open a conversation to start a chat</span>
                 }
            </div>
        </div>
        }
      </div>
  </div>
  )
}
