import { Grid } from '@mui/material'
import React from 'react'
import Banner from '../banner/Banner'
import Category from './Category'
import Posts from './post/Posts'

export default function Home() {
  return (
    <>
     <Banner/>
     <Grid container>
      <Grid item lg={3} sm={3} xs={12}>
          <Category/>
      </Grid>
     
        <Posts/>
    
     </Grid>
    </>
  )
}
