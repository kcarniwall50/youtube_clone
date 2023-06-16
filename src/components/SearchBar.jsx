import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchTerm("");
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <Paper
      elevation={3}
      component="form"
      onSubmit={onhandleSubmit}
      sx={{
        pl: 2,
        borderRadius: 20,
        mr: { xs: 2.2, sm: 8 },
        border: "1px solid #282727",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <input
        className="search-bar"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "auto" }}
      />
      <IconButton
        type="submit"
        sx={{
          p: { xs: "1px" },
          color: "#175af7",

          p: { xs: "1px" },
        }}
        aria-label="search"
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
