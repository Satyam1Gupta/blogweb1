
import {Box, Typography, styled} from "@mui/material";
import React from 'react'

const Image=styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/50%;
width:100%;
height:50vh;
display: flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const Heading=styled(Typography)`
font-size:70px;
color:#fff;
line-height:1
`;
const SubHeading=styled(Typography)`
font-size:20px;
background:#fff;

`;
export default function Banner() {
  return (
    <Image>
         <Heading>BLOG</Heading>
         <SubHeading>Welcome to my Blog</SubHeading>
    </Image>
  )
}
