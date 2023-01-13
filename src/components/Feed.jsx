import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

const Feed = () => {
 
  const [selectedCategory, setselectedCategory] = useState("New")
  const [videos, setvideos] = useState([]);
  //console.log(videos);
  useEffect(() => {
   fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data)=>setvideos(data.items))   
  }, [selectedCategory])
  
  
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>

   { /*sidebar*/}
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          copyright 2022
        </Typography>
      </Box>

      {/*videos*/ }
      <Box p={2} sx={{ overflowY:"auto",flex:2,height:"90vh"}}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;
