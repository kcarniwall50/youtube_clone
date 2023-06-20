import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Typography } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../utils/Loader/Loader";

const url = process.env.REACT_APP_URL;

const VideoDetail = () => {
  console.log("rendered")
  const navigate = useNavigate();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videoComments, setVideoComments] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false)

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

  // yyyy-mm-dd
  const diff = (today, givenDate) => {
    return Math.floor(
      (Date.parse(today.replace(/-/g, "/")) -
        Date.parse(givenDate.replace(/-/g, "/"))) /
        86400000
    );
  };

  function timeSince(time) {
    var days = time;

    var interval = days / 365;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = days / 30;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    if (days === 1) return Math.floor(days) + " day ago";

    return Math.floor(days) + " days ago";
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

  useEffect(() => {
    async function getVideo() {
      const options = {
        method: "GET",
        url: `${url}/video/details/`,
        params: {
          id: `${id}`,
        },
        headers: {
          "content-type": "application/octet-stream",

          "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
          "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
        },
      };

      try {
        setIsLoading(true)
        const response = await axios.request(options);
        setIsLoading(false)
        setVideoDetail(response.data);
      } catch (error) {
        setIsLoading(false)
        if (error.response.status === 429) {
          toast.error("Api calling limit exceeded 😔");
        }
        console.error(error);
      }
    }

    async function getVideoComments() {
      const options = {
        method: "GET",
        url: `${url}/video/comments/`,
        params: {
          id: `${id}`,
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
        setVideoComments(response.data.comments);
      } catch (error) {
        if (error.response.status === 429) {
          toast.error("Api calling limit exceeded 😔");
        }
        console.error(error);
      }
    }

    async function getRelatedVideos() {
      const options = {
        method: "GET",
        url: `${url}/video/related-contents/`,
        params: {
          id: `${id}`,
          hl: "en",
          gl: "US",
          maxResults: 50,
        },
        headers: {
          "content-type": "application/octet-stream",

          "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
          "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
        },
      };

      try {
        setIsLoading(true)
        const response = await axios.request(options);
        setIsLoading(false)
        setVideos(response.data.contents);
      } catch (error) {
        setIsLoading(false)
        if (error.response.status === 429) {
          toast.error("Api calling limit exceeded 😔");
        }
        console.error(error);
      }
    }

    getVideo();
    getRelatedVideos();
    getVideoComments();
  }, [id]);

  return (
    <>
    {isLoading && <Loader/>}
    <Box
      sx={{
        width: "100%",
        display: { xs: "block", sm: "grid" },
        gridTemplateColumns: { sm: "65% auto" },

        padding: "0.5rem 0",

        borderColor: "grey",
        mt: 7,
      }}
    >
      <div style={{}}>
        <Box
          sx={{
            height: "auto",
            borderColor: "1px white",
            marginTop: "0rem",
            marginInline: "auto",
            padding: "0rem 0",
          }}
        >
          <ReactPlayer
            style={{ padding: "0 0.1rem" }}
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />
        </Box>

        {/* // text content video detail */}
        {videoDetail && (
          <div>
            <Box
              sx={{
                backgroundColor: "#1E1E1E",
                p: "0.5rem",
                height: "auto",
                mt: "0rem",
              }}
            >
              <Typography
                sx={{ my: "0.1rem", color: "white", fontSize: "16px" }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/video/${videoDetail?.videoId}`);
                  }}
                >
                  {videoDetail?.title?.slice(0, 70)}
                </span>
              </Typography>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "2rem",
                }}
              >
                <div>
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
                        navigate(`/channel/${videoDetail?.author?.channelId}`);
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                      }}
                    >
                      {videoDetail?.author?.title}{" "}
                      <CheckCircleIcon
                        sx={{ fontSize: "16px", color: "#677381", ml: "5px" }}
                      />
                    </span>
                  </div>

                  <div style={{ fontSize: "15px", color: "#677381" }}>
                    {videoDetail?.author?.stats?.subscribersText}{" "}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "2rem" }}>
                  <div style={{ color: "#82A0AA", fontSize: "15px" }}>
                    {nFormatter(videoDetail?.stats?.likes, 1)}&nbsp; likes
                  </div>

                  <div>
                    <span style={{ color: "#82A0AA", fontSize: "15px" }}>
                      {nFormatter(videoDetail?.stats?.views, 1)} views
                    </span>
                    <p style={{ fontSize: "15px", color: "#82A0AA" }}>
                      {timeSince(
                        diff(
                          String(new Date().toISOString().split("T")[0]),
                          String(videoDetail?.publishedDate)
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Box>

            {/* description */}
            <div
              style={{
                padding: "1rem  0.7rem",
                backgroundColor: "#1E1E1E",
                fontSize: "15px",
              }}
            >
              <hr style={{ color: "#565555" }}></hr>
              <span style={{ color: "white" }}>Video Description: </span>
              <p
                style={{
                  color: "#bdbdbd",
                  font: "100",
                }}
              >
                {videoDetail?.description}
              </p>

              {/* // comments */}

              {videoComments?.length > 0 && (
                <>
                  <hr />
                  <br />
                  <b style={{}}>{videoComments?.length} &nbsp; Comments:</b>

                  {videoComments.map((comment, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "0.8rem 0",
                        display: "grid",
                        gridTemplateColumns: "10%  auto",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <img
                          src={comment?.author?.avatar[0]?.url}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "block",
                          height: "auto",
                          padding: "0 0.3rem",
                        }}
                      >
                        <span style={{ color: "#8e8c8c" }}>
                          {comment?.author?.title}&nbsp; &nbsp;
                          <span style={{ color: "#535252" }}>
                            {comment?.publishedTimeText}
                          </span>
                        </span>
                        <p>{comment?.content}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* nhujkmlllllllllllllllllllllllllllll */}

      <div style={{ marginTop: "0rem", overflow: "hidden" }}>
        {videos &&
          videos.map((video, index) => (
            <Box
              key={index}
              sx={{
                mb: { sm: "0.5rem" },
                px: "0.4rem",
                borderRadius: "10px",
                overflow: "hidden",
                mt: { xs: "0.5rem" },
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  position: "relative",
                  textAlign: "center",
                  color: " white",
                  overflow: "hidden",
                }}
                onClick={() => {
                  navigate(`/video/${video?.video?.videoId}`);
                }}
              >
                <img
                  src={video?.video?.thumbnails[0]?.url}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
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
              </div>

              <Box
                sx={{
                  backgroundColor: "#1E1E1E",
                  padding: "0.7rem  0.5rem 0.4rem 0.5rem",
                  height: "90px",
                  mt: "-0.8rem",
                }}
              >
                <Typography
                  sx={{ mb: "0.3rem", color: "white", fontSize: "13px" }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/video/${video?.video?.videoId}`);
                    }}
                  >
                    {video?.video?.title?.slice(0, 50)}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                    }}
                  >
                    {video?.video?.author?.title}{" "}
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
      </div>
    </Box>
    </>
  );
};

export default VideoDetail;
