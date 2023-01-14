
import React from 'react'
import { useContext } from 'react'
import { Box,styled, TextareaAutosize, Button, Typography } from '@mui/material'
import{Delete} from '@mui/icons-material'
import { DataContext } from '../../../context/DataProvider'
import {API} from '../../../service/api'


const Component=styled(Box)`
margin-top:30px;
background:#f5f5f5;
padding:10px;
`
const Container=styled(Box)`
display:flex;
margin-bottom:5px;
`
const Name=styled(Typography)`
font-weight:600;
font-size:18px;
margin-right:15px;
`
const StyledDate=styled(Typography)`
color:#878787;
font-size:14px;
`
const DeleteIcon=styled(Delete)`
margin-left:auto;

`

export default function Comment({comment,setToggle}) {

    const {acount}=useContext(DataContext)

    const removeCommnet=async()=>{
        let res=await API.deleteComment(comment._id);
        if(res.isSuccess){
            setToggle(prevState=>!prevState)
        }
    }
    
  return (
    <Component>
        <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {acount.name===comment.name && <DeleteIcon onClick={()=>removeCommnet()} />}
        </Container>
        <Box>
            <Typography>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}
