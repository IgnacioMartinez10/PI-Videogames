import {
  GET_GAMES,
  GET_GAME,
  GET_GENRES,
  GET_BY_NAME,
  FILTER_GENRES,
  ORDEN_ALFABETICO,
  GAMES_ORIGIN,
  POST_GAME,
  GAMES_RATING,
} from "./actions";

let initialState = {
  videogames: [],
  videogamesOrigin: [],
  filteredGames: [],
  genres: [],
  gameDetail: [],
  filteredGenres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredGames: action.payload,
      };

    case GET_GAME:
      return {
        ...state,
        gameDetail: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        filteredGames: action.payload,
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

    case FILTER_GENRES:
      let genderGames = [...state.videogames];

      if (action.payload === "AllGenres") {
        return {
          ...state,
          filteredGames: [...state.videogames],
        };
      }
      let genreGames = genderGames.filter((game) =>
        game.genres.includes(action.payload)
      );
      return {
        ...state,
        filteredGames: genreGames,
      };

    case ORDEN_ALFABETICO:
      let orderGames = [...state.filteredGames];

      if (action.payload === "Default") {
        return {
          ...state,
          filteredGames: [...state.filteredGames],
        };
      }
      if (action.payload === "A-Z") {
        orderGames.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === "Z-A") {
        orderGames.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        filteredGames: orderGames,
      };

    case GAMES_RATING:
      let raitingGames = [...state.filteredGames];

      if (action.payload === "Default") {
        return {
          ...state,
          filteredGames: [...state.filteredGames],
        };
      }
      if (action.payload === "menor") {
        const worst = raitingGames.sort((a, b) => a.rating - b.rating);
        return {
          ...state,
          filteredGames: worst,
        };
      }
      if (action.payload === "mayor") {
        const best = raitingGames.sort((a, b) => b.rating - a.rating);
        return {
          ...state,
          filteredGames: best,
        };
      }

    case GAMES_ORIGIN:
      let originGames = [...state.videogames];

      if (action.payload === "All") {
        return {
          ...state,
          filteredGames: [...state.videogames],
        };
      }
      if (action.payload === "api") {
        const apiGames = originGames.filter(
          (game) => typeof game.id === "number"
        );
        return {
          ...state,
          filteredGames: apiGames,
        };
      }
      if (action.payload === "db") {
        const dbGames = originGames.filter(
          (game) => typeof game.id !== "number"
        );
        return {
          ...state,
          filteredGames: dbGames,
        };
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
