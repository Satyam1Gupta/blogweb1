import {Server} from 'socket.io';

const socketServer=async(server)=>{
    
    //chat app--->
    const io= new Server(server,{
        cors: {
             origin:"",//in case of localHost origin:"http://localhost:3000"
             methods: ["GET","POST"],
        },
   });
   
   let users=[];
   const addUser=(userId,socketId)=>{
        !users.some((user)=>user.userId===userId)&&
        users.push({userId,socketId})
        //console.log(users)
   }
   const removeUser=(socketId)=>{
       users=users.filter((user)=>{
        user.socketId!==socketId
       })
   }
   const getUser=(userId)=>{
       
      return users.find(user=>user.userId===userId)
   }
   io.on("connection", (socket) => {
        console.log('A user connected with socket id:',socket.id);
       
   // When connect
        socket.on("add_user",(user)=>{
             //socket.join(data);
             addUser(user,socket.id)
             console.log("user with id",socket.id, "userid:",user)
            io.emit("get_users",users);
        })
   
        // Send and get message
        socket.on("send_msg",(data)=>{
             console.log(data)
             const user=getUser(data.receiverId)
             console.log(user);
             io.to(user.socketId).emit("get_msg",data)
        })
   
   //When disconnect
        socket.on('disconnect', () => {
             console.log('user disconnected', socket.id)
             removeUser(socket.id)
             io.emit("get_users",users);
           });
      });
      
 
 }
 export default socketServer;