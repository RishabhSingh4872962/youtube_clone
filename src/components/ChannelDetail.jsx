import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const ChannelDetail = () => {
  const { id } = useParams();
  const [channel, setchannel] = useState();
  const [channelVideos, setchannelVideos] = useState([]);

 
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setchannel(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setchannelVideos(data?.items)
    );
    
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg,rgba(0,238,247,1) 0% ,rgba(206,3,108,1) 100%,rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channel} marginTop="-120px" />
      </Box>
      <Box display="flex" p={2}>
       <Box sx={{ mr:{sm:"100px"}}} />
       <Videos videos={channelVideos} /> 
      </Box>
    </Box>
  );
};

export default ChannelDetail;
