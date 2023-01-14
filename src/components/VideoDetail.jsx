import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/fetchFromAPI';


const VideoDetail = () => {
  const [video, setvideo] = useState({})
  const {id}=useParams();
  console.log(video);
  useEffect(() => {
   fetchFromAPI(`videos?part=snippet&id=${id}`).then((data)=>setvideo(data.items[0]))
  }, [id])
  
  return (
    <div>VideoDetail</div>
  )
}

export default VideoDetail