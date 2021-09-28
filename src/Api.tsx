const API_KEY: number | string = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL: string | number = `${process.env.REACT_APP_BASE}`;
const FEATURE_API: string = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
const SEARCH_API: string = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
const UPCOMING_API: string = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;
const NOWPLAYING_API: string = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=`;

export {
  API_KEY,
  BASE_URL,
  FEATURE_API,
  SEARCH_API,
  UPCOMING_API,
  NOWPLAYING_API,
};
