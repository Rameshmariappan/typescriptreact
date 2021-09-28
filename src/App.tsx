import React, { useState, useEffect, useCallback } from "react";
import Movie from "./components/movie";
import { checkMovie } from "./components/fetchFunctions";
import { FEATURE_API, SEARCH_API, UPCOMING_API, NOWPLAYING_API } from "./Api";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {
  movies: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
  }[];
}
interface Iapi {
  api: string;
}
interface Isearch {
  search: string;
}

const App: React.FC = (): JSX.Element => {
  const [movies, SetMovies] = useState<IProps["movies"]>([]);
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [api, setApi] = useState<Iapi["api"]>(FEATURE_API);
  const [searchmovie, setSearchmovie] = useState<Isearch>();
  useEffect(() => {
    checkMovie(FEATURE_API, currentpage).then<void>((data: any) => {
      SetMovies(data.results);
    });
  }, []);
  const nextScroll = () => {
    let scrollCount = currentpage + 1;
    setCurrentPage(scrollCount);
    checkMovie(api, scrollCount).then((data) => {
      SetMovies([...movies, ...data.results]);
    });
  };

  const debounce = (func: any) => {
    let timer: any;
    return function (this: any, ...args: any[]) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };

  const searchHandle = (e: any) => {
    console.log(e.target.value);
    // setSearchmovie(e.target.value);
    let value = e.target.value;
    if (value) {
      setCurrentPage(1);
      checkMovie(SEARCH_API + value + `&page=`, 1).then((data) => {
        setApi(SEARCH_API + value + `&page=`);
        setSearchmovie(value);
        SetMovies(data.results);
      });
    } else {
      checkMovie(FEATURE_API, currentpage).then((data) => {
        SetMovies(data.results);
      });
    }
  };
  const optimisedVersion = useCallback(debounce(searchHandle), []);

  return (
    <div>
      <header className="headers">
        <h2 className="mov">MovFlix</h2>
        <div>
          <input
            className="search"
            type="search"
            placeholder="Search!!!!!!"
            onChange={optimisedVersion}
          />
        </div>
      </header>
      <div className="mybutton">
        <button
          className="popular"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setCurrentPage(1);
            checkMovie(FEATURE_API, 1).then<void>((data: any) => {
              setApi(FEATURE_API);
              SetMovies(data.results);
            });
          }}
        >
          Popular
        </button>
        <button
          className="upcoming"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setCurrentPage(1);
            checkMovie(UPCOMING_API, 1).then((data) => {
              setApi(UPCOMING_API);
              SetMovies(data.results);
            });
          }}
        >
          Upcoming
        </button>
        <button
          className="nowplaying"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setCurrentPage(1);
            checkMovie(NOWPLAYING_API, 1).then<void>((data) => {
              setApi(NOWPLAYING_API);
              SetMovies(data.results);
            });
          }}
        >
          Now Playing
        </button>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <Movie key={movie.id} {...movie} />;
          })}
      </div>
      <div>
        <InfiniteScroll
          dataLength={movies.length}
          next={nextScroll}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          children={undefined}
        />
      </div>
    </div>
  );
};

export default App;
