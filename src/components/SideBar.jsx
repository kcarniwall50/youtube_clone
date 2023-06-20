import React from "react";
import { categories } from "../utils/constants";
import { Box, Stack } from "@mui/material";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      sx={{
        height: { xs: "auto", sm: "100%" },
        overflow: "auto",
        flexDirection: { xs: "row", sm: "column" },

        mt: { xs: "1rem" },
      }}
    >
      {categories.map((category, index) => (
        <button
          key={category.name}
          className="category-btn"
          style={{
            background: category.name === selectedCategory && "#175af7",
            color: "white",
            marginInline: "3px",
            marginTop: "2rem",
          }}
          onClick={() => {
            setSelectedCategory(category.name);
          }}
        >
          <Box
            sx={{
              color: category.name === selectedCategory ? "white" : "blue",
              marginRight: { xs: "10px" },
            }}
          >
            {category.icon}
          </Box>

          <span style={{ color: "white" }}>{category.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;
