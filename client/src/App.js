import React from 'react'
import Navbar from './component/header/Navbar'
import {Redirect,Routes,Route,Outlet,Navigate}from 'react-router-dom'
import Login from './component/account/Login'
import DataProvider from './context/DataProvider'
import Home from './component/home/Home'
import { useState } from 'react'
import CreatePost from './component/create/Create-Post'
import DetailView from './component/details/DetailView'
import Update from './component/create/Update'
import Message from './component/message/Message'
//comment
const PrivateRoute=({userAuthenticated,...props})=>{
  return userAuthenticated?
  <>
   <Navbar/>
  <Outlet/>
  </>
  :
  <>
  <Navbar/>
  <Outlet/>
  </>
  
}
export default function App() {

  const[userAuthenticated,setUserAuthenticated]=useState(false);

  return (
    
    <DataProvider>
      <div style={{marginTop:80}}>
        <Routes>
          
          <Route path='/login' element={<Login setUserAuthenticated={setUserAuthenticated}/>}/>
          
          <Route path='/' element={<PrivateRoute userAuthenticated={userAuthenticated}/>}>
            <Route path='/' element={<Home/>}/>
          </Route>

          <Route path='/create' element={<PrivateRoute userAuthenticated={userAuthenticated}/>}>
            <Route path='/create' element={<CreatePost/>}/>
          </Route>
          <Route path='/message' element={<PrivateRoute userAuthenticated={userAuthenticated}/>}>
            <Route path='/message' element={<Message/>}/>
          </Route>
          
          <Route path='/post/:id' element={<PrivateRoute userAuthenticated={userAuthenticated}/>}>
          <Route path='/post/:id' element={<DetailView/>}/>
          </Route>
          <Route path='/update/:id' element={<PrivateRoute userAuthenticated={userAuthenticated}/>}>
            <Route path='/update/:id' element={<Update/>}/>
          </Route>
        </Routes>
        </div>
        </DataProvider>
      
    
  )
}
