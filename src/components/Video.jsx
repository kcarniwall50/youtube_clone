import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import {
  demoChannelTitle,
  demoThumbnailUrl,
  demoVideoTitle,
} from "../utils/constants";
import Loader from "../utils/Loader/Loader";

const Video = ({isLoading, videos, channelTitle }) => {
  const navigate = useNavigate();
  console.log("rendered")


  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }

  return (
    <>
    {isLoading && <Loader/>}
    <Stack
      sx={{
        color: "white",
        margin: "0rem",
        padding: "0rem",
        overflow: "auto",
        height: "100%",
        width: "100%",
        backgroundColor: "",
        mt: { sm: "0rem" },
        display: { sm: "grid" },
        gridTemplateColumns: {
          sm: "auto auto",
          md: "auto auto auto ",
          lg: "auto auto auto auto",
          xl: "auto auto auto auto auto",
        },
        mt: { xs: "1rem" },

        flexWrap: "wrap",
      }}
    >
      {videos?.length > 0 &&
        videos.map((video, index) => (
          <Box
            key={index}
            sx={{
              mb: "0",
              px: "0.2rem",
              borderRadius: "10px",
              mb: { xs: "0.6rem" },
            }}
          >
            <Box
              style={{
                cursor: "pointer",
                position: "relative",
                textAlign: "center",
                color: " white",
              }}
              sx={{ width: { xs: "auto" }, height: { xs: "auto" } }}
              onClick={() => {
                navigate(`/video/${video?.video?.videoId}`);
              }}
            >
              <img
                src={video?.video?.thumbnails[0]?.url || demoThumbnailUrl}
                style={{ width: "100%", height: "150px" }}
                alt="imge"
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "6px",
                  backgroundColor: "black",
                  padding: "0.1rem 0.2rem",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
              >
                {fancyTimeFormat(video?.video?.lengthSeconds)}
              </span>
            </Box>

            <Box
              sx={{
                backgroundColor: "#1E1E1E",
                p: "0.5rem",
                height: "90px",

                mt: "-0.8rem",
                mt: { xs: "-1rem" },
              }}
            >
              <Typography
                sx={{ my: "0.3rem", color: "white", fontSize: "13px" }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/video/${video?.video?.videoId}`);
                  }}
                >
                  {video?.video?.title?.slice(0, 50) || demoVideoTitle}
                </span>
              </Typography>

              <div
                style={{
                  fontSize: "12px",
                  margin: "0.3rem 0",
                  color: "grey",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                
                 
                  onClick={() => {
                    !channelTitle && 
                    navigate(`/channel/${video?.video?.author?.channelId}`);
                  }}

                
                  style={{
                    cursor: !channelTitle ? "pointer":'none',
                    display: "flex",
                    alignItems: "center",
                    fontSize: "13px",
                  }}
                >
                  {video?.video?.author?.title || channelTitle || demoChannelTitle}{" "}
                  <CheckCircleIcon
                    sx={{ fontSize: "13px", color: "#677381", ml: "5px" }}
                  />
                </span>
              </div>

              <div>
                <span style={{ color: "#82A0AA", fontSize: "14px" }}>
                  {nFormatter(video?.video?.stats?.views, 1)} views &nbsp;{" "}
                  {video?.video?.publishedTimeText}
                </span>
              </div>
            </Box>
          </Box>
        ))}
    </Stack>
    </>
  );
};

export default Video;
