
import React from 'react'
import { useContext } from 'react'
import { Box,styled, TextareaAutosize, Button, Typography } from '@mui/material'
import{Edit,Delete} from '@mui/icons-material'
import { DataContext } from '../../../context/DataProvider'
import {API} from '../../../service/api'


const Component=styled(Box)`
margin-top:20px;
padding-left:15px;
`
const Container=styled(Box)`
display:flex;
margin-bottom:0px;
`
const Name=styled(Typography)`
font-weight:550;
font-size:12px;
margin-right:15px;
`
const StyledDate=styled(Typography)`
color:#878787;
font-size:13px;
`
const DeleteIcon=styled(Delete)`
margin-left:auto;
`
const EditIcon=styled(Edit)`
margin-left:auto;
`

export default function Comment({comment,setToggle}) {

    const username=sessionStorage.getItem('userName');
 
  const {acount}=useContext(DataContext)

    const removeCommnet=async()=>{
        let res=await API.deleteComment(comment._id);
        if(res.isSuccess){
            setToggle(prevState=>!prevState)
        }
    }
    // const editCommnet=async()=>{
    //     let res=await API.editComment(comment._id);
    //     if(res.isSuccess){
    //         setToggle(prevState=>!prevState)
    //     }
    // }
    
  return (
    <Component>
        <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {(acount.name===comment.name || username===comment.userName) && 
        <Box style={{marginLeft:'40px'}}>
             {/* <EditIcon onClick={()=>editCommnet()}/> */}
            <DeleteIcon onClick={()=>removeCommnet()}  />
        </Box>
        }
        </Container>
        <Box>
            <Typography sx={{fontSize:14}}>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}
