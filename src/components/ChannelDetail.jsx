import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Video from "./Video";
import { toast } from "react-toastify";
import Loader from "../utils/Loader/Loader";

const ChannelDetail = () => {
  console.log("rendered")
  const [channelDetail, setChannelDetail] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const { id } = useParams();

  const url = process.env.REACT_APP_URL;
  const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        const response = await axios.request(options);
        setIsLoading(false)
        console.log(response.data)
        setChannelDetail(response.data);
      } catch (error) {
        setIsLoading(false)
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
        setIsLoading(true)
        const response = await axios.request(options);
        setIsLoading(false)
        setChannelVideos(response.data.contents);
      } catch (error) {
        setIsLoading(false)
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
    <>
    {isLoading && <Loader/>}
    <div style={{ padding: "0.2rem",  }}>
      {/* channel banner */}
      <div  style={{height:'100%', marginTop:'4rem'}} >
        <img
          src={channelDetail?.banner?.mobile[1]?.url}
          style={{ width: "99vw" , paddingInline: "0px", height:'175px',  }}
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
        <div  style={{}} >
          <img
            src={channelDetail?.avatar[1]?.url}
            style={{ borderRadius: "50%", }}
          />
        </div>
        <div>
          <div
            style={{ display: "flex", alignItems: "center", justifyContent:'center', color: "#677381" }}
          >
            {" "}
            <span>{channelDetail?.title}</span>&nbsp;
            {channelDetail?.title && <CheckCircleIcon />}
          </div>
          <div
            style={{
              width: "100%",
              display: "inline-flex",
              flexWrap:'wrap',
              alignItems: "center",
              justifyContent: "space-around",
              gap: "5%",
              color: "#82A0AA",
              fontSize: "15px",
              // marginInline:'0.3rem'
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
      {channelVideos?.length > 0 && <Video videos={channelVideos}  channelTitle={channelDetail?.title} />}
    </div>
    </>
  );
};

export default ChannelDetail;
