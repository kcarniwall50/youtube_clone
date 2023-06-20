import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchBar from "./SearchBar";

const Navbar = () => {
  console.log("rendered")
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 2,
        px: { xs: 1, sm: 2 },

        position: "fixed",
        top: 0,
        width: "100%",
        height: "6vh",
        zIndex: 1,

        background: "#000",
        justifyContent: "space-between",
        alignItems: "c",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <YouTubeIcon fontSize="large" sx={{ color: "blue" }} />
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
