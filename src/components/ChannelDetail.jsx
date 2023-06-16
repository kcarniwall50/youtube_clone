import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Video from "./Video";
import { toast } from "react-toastify";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const { id } = useParams();

  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    async function getChannelDetails() {
      const options = {
        method: "GET",
        url: `${url}/channel/details/`,
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
        setChannelDetail(response.data);
      } catch (error) {
        if (error.response.status === 429) {
          toast.error("Api calling limit exceeded 😔");
        }
        console.error(error);
      }
    }

    async function getChannelVideos() {
      const options = {
        method: "GET",
        url: `${url}/channel/videos/`,
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
        setChannelVideos(response.data.contents);
      } catch (error) {
        if (error.response.status === 429) {
          toast.error("Api calling limit exceeded 😔");
        }
        console.error(error);
      }
    }

    getChannelDetails();
    getChannelVideos();
  }, [id]);

  return (
    <div style={{ padding: "0.2rem" }}>
      {/* channel banner */}
      <div>
        <img
          src={channelDetail?.banner?.mobile[1]?.url}
          style={{ width: "99vw", paddingInline: "0px" }}
        />
      </div>

      {/* channel details */}

      <div
        style={{
          display: "inline-flex",

          alignContent: "center",
          gap: "0.3rem",
          margin: "1.5rem 0",
          width: "100%",
        }}
      >
        <div>
          <img
            src={channelDetail?.avatar[1]?.url}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div>
          <div
            style={{ display: "flex", alignItems: "center", color: "#677381" }}
          >
            {" "}
            <span>{channelDetail?.title}</span>&nbsp;
            {channelDetail?.title && <CheckCircleIcon />}
          </div>
          <div
            style={{
              width: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10%",
              color: "#82A0AA",
              fontSize: "15px",
            }}
          >
            {" "}
            <p style={{ color: "#677381" }}> {channelDetail?.username} </p>
            <p> {channelDetail?.stats?.subscribersText} </p>
            <p> {channelDetail?.stats?.videosText} </p>
            <p> {channelDetail?.joinedDateText} </p>
          </div>
        </div>
      </div>

      {/* //channel  videos */}
      {channelVideos?.length > 0 && <Video videos={channelVideos} />}
    </div>
  );
};

export default ChannelDetail;
