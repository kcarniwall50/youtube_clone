import React, { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { SideBar, Video } from "./index";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_URL;

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchFromApi() {
      const options = {
        method: "GET",
        url: `${url}/search/`,
        params: {
          q: `${selectedCategory}`,
          hl: "en",
          gl: "US",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
          "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
        },
      };

      try {
        const response = await axios.request(options);
        setVideos(response.data.contents);
      } catch (error) {
        if (error.response.status === 429) {
          toast.error("Api calling limit exceeded 😔");
        }
        console.error(error);
      }
    }

    fetchFromApi();
  }, [selectedCategory]);

  return (
    <Stack
      sx={{ mt: 5, flexDirection: { xs: "column", sm: "row" }, width: "100%" }}
    >
      <Box
        sx={{
          height: { xs: "auto", sm: "93vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box sx={{ p: 0, height: { xs: "auto", sm: "90vh", width: "100%" } }}>
        <Video videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
