import { CheckCircle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const VideoDetail = () => {
  const [video, setvideo] = useState(null);
  const [relatedVideos, setrelatedVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`).then(
      (data) => setvideo(data.items[0])
    );

    fetchFromAPI(
      `search?part=snippet,id&relatedToVideoId=${id}&type=video&maxResults=50`
    ).then((data) => setrelatedVideos(data.items));
  }, [id]);
  if (!video?.snippet ) return "Loading...";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { likeCount, viewCount },
  } = video;
//console.log(`https://www.youtube.com/watch?v=${id}`);
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" varient="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  varient={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}{" "}
                  <CheckCircle
                    sx={{ fontSize: "12px", colot: "grey", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} like
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{xs:5,md:1}} justifyContent="center" alignItems='center'>
    <Videos videos={relatedVideos} direction='column'/>
    </Box>
      </Stack>
    
    </Box>
  );
};

export default VideoDetail;
