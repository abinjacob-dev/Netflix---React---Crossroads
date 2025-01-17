import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { imageUrl,API_KEY } from "../../constants/constants";
import "./RowPost.css";
import Youtube from "react-youtube";
function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        // alert("API KEY WRONG!!! ");
      });
    //eslint-disable-next-line
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-U&api_key=${API_KEY}`).then(response=>{
     if(response.data.results.length!== 0){
      setUrlId(response.data.results[0])
     }else{
      console.log("Youtube Url not found")
     }

    })
    console.log(id);
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
      { urlId && <Youtube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
