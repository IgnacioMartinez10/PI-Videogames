const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { infoFiltered } = require("../helpers/mapDataGames");
const { API_KEY } = process.env

const getAllDriversController = async () => {
  try {
    let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let apiGamesData = response.data;

    const getApi = infoFiltered(apiGamesData);

    const getDb = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    let allGames = [...getDb, ...getApi];
    return allGames
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllDriversController };
