import React,{useState,useEffect} from 'react'
import { AppBar,Toolbar,Typography,styled,Button,alpha,Box } from '@mui/material'
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { SearchRounded } from '@mui/icons-material';
import SearchResult from './SearchResult';

const Component=styled(AppBar)`
background:#ffffff;
color:#000;
z-index:0;
`;

const Container=styled(Toolbar)`
justify-content:center;
z-index:0;
& > a{
  padding:20px;
  text-decoration:none;
  color:#000;
}
`;
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor:'#e6e6e6', 
  color:'#000',
  borderRadius:'20px',
  //backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]:{
       
      }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));
const SearchR=styled(Box)`
background:#e6e6e6;
margin-top:10px;
max-height:180px;
border-radius:10px;

overflow-y:scroll;
position:absolute;
z-index:1;
`;
export default function Navbar() {
  const[size,setSize]=useState(window.innerWidth)
  const[toggle,setToggle]=useState(true)
  const[input,setInput]=useState('')
  //setSize(window.screen.width)
  function resize() {
    setSize(window.innerWidth)
    //console.log(size);
  };
  window.onresize=resize;
  //console.log(input);
function handleClick(){
  setToggle(false)
  setSize(640)
}

  return (
    <Component >
      <Container>
        {
          toggle &&
         <>
            <Link to='/'>Home</Link>
            <Link to='/'>About</Link>
            <Link to='/login'>Login</Link>
         </>
        }
       <Box>
       {
        size>=600 &&
        <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search your question"
          inputProps={{ 'aria-label': 'search' }}
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
        />
      </Search>
       }
        <SearchR >
            <SearchResult input={input} />
        </SearchR>
       </Box>
       {
         size<600 &&
         <Button style={{color:'inherit'  }}onClick={()=>handleClick()}>
          <SearchIcon  />
         </Button>
       }
      </Container>
    </Component>
  )
}
