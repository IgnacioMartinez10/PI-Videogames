import axios from 'axios';

export const GET_GAMES = "GET_GAMES";
export const GET_GAME = "GET_GAME";

const URL = "http://localhost:3001";
axios.defaults.baseURL = URL;

export const getGames = () => { //como es de redux no puede hacer una operacion asincrona
    return async function (dispatch) {
        const response = await axios.get('/videogames');
        const videogames = response.data;
        dispatch({
            type: GET_GAMES,
            payload: videogames
        })
    }
};

export const getGame = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `/videogames/${id}`)
        const videogame = apiData.data;
        dispatch({
            type: GET_GAME,
            payload: videogame
        });
    };
};