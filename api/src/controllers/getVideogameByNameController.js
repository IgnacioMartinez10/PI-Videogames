const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { mapDataGames,infoFiltered } = require("../helpers/mapDataGames");
const { Op } = require("sequelize");
const API_KEY = process.env.API_KEY;

const getVideogameByNameController = async (name) => {
  try {
    const gamesByNameDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    let gamesFromApi = [];

    for (let i = 1; i < 6; i++) {
      let allGamesFromApiFullInfo = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
        )
      ).data.results;
      let allGamesFromApiFiltered = infoFiltered(allGamesFromApiFullInfo);
      gamesFromApi.push(allGamesFromApiFiltered);
    }
    let allGames = [];
    gamesFromApi.map((el) => {
      allGames = allGames.concat(el);
    });

    const gamesByNameApi = allGames.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );

    if (gamesByNameDB.length === 0 && gamesByNameApi.length === 0)
      throw new Error(
        `No se encontraron juegos que contengan ${name} en su nombre`
      );

    return [...gamesByNameDB, ...gamesByNameApi];
  } catch (error) {
    throw error;
  }
};

module.exports = { getVideogameByNameController };
