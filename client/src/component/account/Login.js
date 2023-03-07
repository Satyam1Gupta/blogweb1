import React from 'react'
import { useState,useContext } from 'react';
import {Box,TextField,Button,styled,Typography} from '@mui/material'
import {API} from '../../service/api'
import { DataContext } from '../../context/DataProvider';
import{useNavigate} from 'react-router-dom'

//import { typography } from '@mui/system';
//import styled from '@emotion/styled/types/base';

const Component=styled(Box)(({theme})=>({
  width:'400px' ,
  margin:'auto',
  marginTop:'25px',
  boxShadow: '5px 2px 5px 2px rgb(0 0 0/ 0.6)',
  borderRadius:'5px',
  [theme.breakpoints.down('sm')]:{
    width:'335px',
    margin: 'auto',
    marginTop:'1px',
  }
}));
// const Component= styled(Box)`
// width:400px;
// margin:auto;
// margin-top:25px;
// box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
// border-radius:5px;
// `;

const Image=styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0 0'
});
const Wrapper=styled(Box)`
text-align:center;
padding:25px;
display:flex;
flex-direction:column;
& > div, &>button,&>p{
    margin-top:20px;
}
`;
const LoginButton=styled(Button)`
text-transform:none;
background:#FB641B;
border-radius:20px
`
const SignUpButton=styled(Button)`
text-transform:none;
background:#FFF;
box-shadow: 0px 2px 4px 0px rgb(0 0 0/30%);
border-radius:20px;
`;
const Error=styled(Typography)`
font-size:12px;
color:red;
margin-top:20px;
font-weight:600;
`
const signUpInitialValue={
name:'',
username:'',
password:''
};
export default function Login({setUserAuthenticated}) {

  const navigate=useNavigate();
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account, setAccount]=useState('login');

    const {setAcount}=useContext(DataContext);

    function handleSignUp(){
    account==='login'?setAccount('signup'):setAccount('login');
   };

   const[error,setError]=useState('');
   const[signUp,setSignUp]=useState(signUpInitialValue);
   const[login,setLogin]=useState({username:'',password:''})

   const onChangeInput=(e)=>{
    //console.log(e.target.name, e.target.value);
    setSignUp({...signUp,[e.target.name]:e.target.value});
  }
  
  const onChangeValue=(e)=>{
     setLogin({...login,[e.target.name]:e.target.value});
    }

   //console.log(signUp);
   const signupUser=async()=>{
    let res= await API.userSignup(signUp);
    //let re= res.json();
    console.log(res);
    if(res.isSuccess){
      setSignUp(signUpInitialValue);
      setAccount('login')
    } else{
     setError('Something went wrong, please try again later...!')
    }
   }

   const loginUser=async()=>{
    let res=await API.userLogin(login);
    if(res.isSuccess){
      setError('');

      sessionStorage.setItem('accessToken',`${res.data.accessToken}`);
      sessionStorage.setItem('refreshToken',`Bearer${res.data.refreshToken}`);
      sessionStorage.setItem('userName',res.data.username);
      sessionStorage.setItem('name',res.data.name);

      setAcount({username:res.data.username,name:res.data.name});
      setUserAuthenticated(true);

      navigate('/');

    } else{
     setError('Something went wrong, please try again later...!')
    }
   }

  return (
    <Component>
        <Box>
            <Image src={imageURL} />
           { 
           account==='login'?
           <Wrapper>
                <TextField  variant="standard" label='Enter Username'onChange={(e)=>onChangeValue(e)} name='username'/> 
                <TextField  variant="standard" label='Enter Password'onChange={(e)=>onChangeValue(e)} name='password'/> 
                { <Error > {error} </Error>}
                <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                <Typography>OR</Typography>
                <SignUpButton variant="text" onClick={()=>handleSignUp()}>Create an account</SignUpButton>
            </Wrapper>
            :
            <Wrapper>
                <TextField  variant="standard" label='Enter Name'onChange={(e)=>onChangeInput(e)} name='name'/> 
                <TextField  variant="standard" label='Enter Username'onChange={(e)=>onChangeInput(e)} name='username'/> 
                <TextField  variant="standard" label='Enter Password'onChange={(e)=>onChangeInput(e)}name='password'/> 
                { <Error > {error} </Error>}
                <LoginButton  variant="contained"onClick={()=>signupUser()}>Sign Up</LoginButton>
                <Typography>OR</Typography>
                <SignUpButton variant="text" onClick={()=>handleSignUp()}>Already have an account</SignUpButton>
            </Wrapper>}
      </Box>

    </Component>
  )
}
