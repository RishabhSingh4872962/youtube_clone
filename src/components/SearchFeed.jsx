import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

const SearchFeed = () => {
  const [videos, setvideos] = useState([]);
  const {searchfeed}=useParams();

  console.log(videos);
  useEffect(() => {
    fetchFromAPI(`search?q=${searchfeed}&part=snippet`).then((data)=>setvideos(data.items))
  }, [searchfeed])
  
  return (
    <Box p={2} sx={{ overflowY:"auto",flex:2,height:"90vh"}}>
    <Typography
      variant="h4"
      fontWeight="bold"
      mb={2}
      sx={{ color: "white" }}
      style={{textAlign:"center"}}
    >
      Your search is here: <span style={{ color: "#F31503" }}>{searchfeed}</span> Videos
    </Typography>
    <Box display="flex" p={2}>
       <Box sx={{ mr:{sm:"100px"}}} />
    <Videos videos={videos}/>
    </Box>
  </Box>
  )
}

export default SearchFeed