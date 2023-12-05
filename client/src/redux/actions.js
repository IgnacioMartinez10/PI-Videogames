import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GAME = "GET_GAME";
export const GET_GENRES = "GET_GENRES";
export const POST_GAME = "POST_GAME";

const URL = "http://localhost:3001";
axios.defaults.baseURL = URL;

export const getGames = () => {
  //como es de redux no puede hacer una operacion asincrona
  return async function (dispatch) {
    const apiData = await axios.get("/videogames");
    const videogames = apiData.data;
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
