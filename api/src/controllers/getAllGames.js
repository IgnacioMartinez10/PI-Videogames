const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { infoFiltered } = require("../utils/utilsFunctions");

const getAllGames = async () => {
    const allGamesFromDB = await Videogame.findAll({ include: [Genre] });
    let allGamesFromDBFiltered = infoFiltered(allGamesFromDB);
    let gamesFromApi = [];
  
    for (let i = 1; i < 6; i++) {
      const allGamesFromApiFullInfo = (
        await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
      ).data.results;
      const allGamesFromApiFiltered = infoFiltered(allGamesFromApiFullInfo);
      gamesFromApi.push(allGamesFromApiFiltered);
    }
  
    let allGames = [];
    gamesFromApi.forEach((el) => {
      allGames = allGames.concat(el);
    });
  
    return [...allGamesFromDBFiltered, ...allGames];
  };

  module.exports = { 
    getAllGames,
  }

