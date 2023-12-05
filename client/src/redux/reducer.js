import { GET_GAMES, GET_GAME, POST_GAME, GET_GENRES } from "./actions";

const initialState = {
  games: [],
  gameDetail: [],
  genres: [],
  filteredGenres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, games: action.payload };
    case GET_GAME:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case POST_GAME:
      return {
        ...state,
        videogames: [...state.videogames, action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
        filteredGenres: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
