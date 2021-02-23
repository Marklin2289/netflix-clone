import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //   A snippet of code which runs based on a specific condition/var
  useEffect(() => {
    // if [], run once when the row loads and don't run it again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //   console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //   console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  //   const handleClick = async (movie) => {
  //     if (trailerUrl) {
  //       setTrailerUrl("");
  //     } else {
  //       movieTrailer(movie?.name || "")
  //         .then((url) => {
  //           const urlParams = new URLSearchParams(new URL(url).search);
  //           setTrailerUrl(urlParams.get("v"));
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   };
  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerUrl = await axios.get(
        `/movie/${movie.id}/videos?api_key=e60f617cd273dc4130480409c052335e`
      );
      setTrailerUrl(trailerUrl.data.results[0]?.key);
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* row posters */}
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
