import React from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow,styled } from '@mui/material'
import { categories } from "../../constants/data";
import { Link,useSearchParams } from 'react-router-dom';

const StButton=styled(Button)`
margin:20px;

`
const StTable=styled(Table)`
border:1px solid rgba(224,224,224,1);
`
export default function Category() {
    const[SearchParams]=useSearchParams();
    const categry=SearchParams.get('category')

  return (
    <>
      <Link to={`/create?category=${categry || ''}`} style={{textDecoration:'none' ,color:'inherit'}}>
      <StButton variant="contained" color="success">Create Blog</StButton>
      </Link>
      <StTable>
        <TableHead>
            <TableRow>
                <TableCell>
                    <Link to='/' style={{textDecoration:'none',color:'inherit'}}>
                    All Categories
                    </Link>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                categories.map(category => (
                    <TableRow key={category.id}>
                       <TableCell>
                        <Link to={`/?category=${category.type}`} style={{textDecoration:'none',color:'inherit'}}>
                        {category.type}
                        </Link>
                       </TableCell>
                    </TableRow>

                ))
            }
        </TableBody>
      </StTable>
    </>
  )
}
