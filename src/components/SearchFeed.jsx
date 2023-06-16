import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_URL;

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    async function getSearchVideos() {
      const options = {
        method: "GET",
        url: `${url}/search/`,
        params: {
          q: `${searchTerm}`,
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

    getSearchVideos();
  }, [searchTerm]);

  return <div>{videos?.length > 0 && <Video videos={videos} />}</div>;
};

export default SearchFeed;
