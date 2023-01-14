import { Search } from "@mui/icons-material";
import { Paper, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setsearchQuery] = useState("")
const navigate=useNavigate()

const handleSubmit=(e)=>{
  e.preventDefault()
  if (searchQuery) {
    navigate(`/search/${searchQuery}`)
    setsearchQuery('')
  }
}
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        pl: 2,
        border: "1px solid #e3e3e3",
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        placeholder="search..."
         value={searchQuery}
         onChange={(event)=>setsearchQuery(event.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
        <Search  />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
