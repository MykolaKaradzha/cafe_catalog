
const BASE_URL = `http://cafe-env.eba-tqzcypxp.eu-west-3.elasticbeanstalk.com/api/cafe/`;

export const CAFES = (pageNumber: number = 0) =>
  `${BASE_URL}?page=${pageNumber}&count=6&sortBy=id:ASC`;

export const CAFE = (id: string) => `${BASE_URL}${id}`;

export const SORTED_BY = (option: string, order: string) =>
    `${BASE_URL}?sortBy=${option}:${order}`

export enum OPTIONS {
    PRICE_LEVEL = 'priceLevel',
    RATING = 'rating',
    NOISE_LEVEL = 'noiseLevel',
    ID = 'id'
}

export enum ORDER {
    ASC = 'ASC',
    DESC = 'DESC',
}

// export const LATEST = (pageNumber = 1) =>
//   `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
//
// export const MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
//
// export const TV_GENRES = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;
//
// export const TV_SHOWS=(pageNumber=1) => `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
//
// export const FILTERED_MOVIES_WITH_GENRES=(pageNumber=1,id)=>`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${id}&with_watch_monetization_types=flatrate`
//
// export const FILTERED_TV_SHOWS_WITH_GENRES=(pageNumber=1,id)=>`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&with_genres=${id}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
//
//
// export const SEARCH_MOVIES=(pageNumber=1,query="")=>`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
