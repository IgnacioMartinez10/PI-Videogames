import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GAME = "GET_GAME";
export const GET_GENRES = "GET_GENRES";
export const GET_BY_NAME = "GET_BY_NAME";
export const POST_GAME = "POST_GAME";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDEN_ALFABETICO = "ORDEN_ALFABETICO";
export const GAMES_ORIGIN = "GAMES_ORIGIN";
export const GAMES_RATING = "GAMES_RATING";
export const RESET_GAMES = "RESET_GAMES";
export const RESET_ORIGIN_FILTER = "RESET_ORIGIN_FILTER"

const URL = "http://localhost:3001";
axios.defaults.baseURL = URL;

export const getGames = () => {
  //como es de redux no puede hacer una operacion asincrona
  return async function (dispatch) {
    const response = await axios.get("/videogames");
    const videogames = response.data;
    dispatch({
      type: GET_GAMES,
      payload: videogames,
    });
  };
};

export const getGame = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`/videogames/${id}`);
    const videogame = apiData.data;
    dispatch({
      type: GET_GAME,
      payload: videogame,
    });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/videogames?name=${name}`);
      const videogame = response.data;
      dispatch({
        type: GET_BY_NAME,
        payload: videogame,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const postGame = (form) => {
  return async function (dispatch) {
    try {
      const objetoJuego = await axios.post(`/videogames`, form);
      dispatch({
        type: POST_GAME,
        payload: objetoJuego.data,
      });
    } catch (error) {
      console.log("Error, No se pudo postear");
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const allGenresDB = (await axios.get(`/genres`)).data;
    dispatch({
      type: GET_GENRES,
      payload: allGenresDB,
    });
  };
};

export const filterByGenres = (genero) => {
  return {
    type: FILTER_GENRES,
    payload: genero,
  };
};

export const gamesOrder = (orden) => {
  return {
    type: ORDEN_ALFABETICO,
    payload: orden,
  };
};

export const gamesOrigin = (orden) => {
  return {
    type: GAMES_ORIGIN,
    payload: orden,
  };
};

export const ratingOrder = (orden) => {
  return {
    type: GAMES_RATING,
    payload: orden,
  };
};

export function resetFilters(filtrosIniciales) {
  return function (dispatch) {
    dispatch({
      type: RESET_GAMES,
      payload: filtrosIniciales,
    });
  };
}

export function resetOriginFilter() {
  return {
    type: RESET_ORIGIN_FILTER,
  };
}
