const axios = require = ("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { filterGame } = require("../utils/utilsFunctions");

const getByIdDB = async (id, source) => {
  let game = {};
  let filteredGame = {};

  if (source === "api") {
    game = (
      await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    ).data;
    filteredGame = filterGame(game);
  } else {
    game = await Videogame.findByPk(id, { include: [Genre] });
    filteredGame = filterGame(game);
    return filteredGame;
  }

  return filteredGame;
};



 module.exports = {
   getByIdDB
 };
