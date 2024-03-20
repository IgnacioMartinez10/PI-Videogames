const axios = require("axios");
const { API_KEY } = process.env;
const { infoFiltered } = require("../utils/utilsFunctions");

const getAllGamesFromApiByName = async (name) => {
  const gamesFromApi = [];

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

  // Filtrar juegos por nombre
  const gamesByNameApi = allGames.filter((game) =>
    game.name.toLowerCase().includes(name.toLowerCase())
  );

  return gamesByNameApi;
};



 module.exports = {
  getAllGamesFromApiByName
 };
