import React from "react";
const IMAGE_API = `${process.env.REACT_APP_IMAGE_BASE}`;
const colorofvotes = (vote: number) => {
  if (vote > 8) {
    return "red";
  } else if (vote > 5) {
    return "green";
  } else {
    return "yellow";
  }
};
interface Ingi {
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}
const Movie: React.FC<Ingi> = ({
  title,
  poster_path,
  overview,
  vote_average,
}): JSX.Element => {
  return (
    <div className="movie">
      <img src={IMAGE_API + poster_path} alt={title} />
      <div className="movie-name">
        <h3>{title}</h3>
        <span className={`tag ${colorofvotes(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-overview">
        <h2>Movie Overview:</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
