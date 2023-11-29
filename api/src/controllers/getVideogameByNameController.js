const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { mapDataGames } = require("../helpers/mapDataGames");
const { Op } = require("sequelize");
const API_KEY = process.env.API_KEY;

const getVideogameByNameController = async (name) => {
  try {
    const dbGames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
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

    const apiResponse = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    const apiGames = apiResponse.data.results.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );

    const apiDataGames = mapDataGames(apiGames);
    const dbDataGames = mapDataGames(dbGames);

    if (!apiGames.length && !dbGames.length)
      throw new Error("This videogames does not exist");

    return [...apiDataGames, ...dbDataGames].slice(0, 15);
  } catch (error) {
    throw error;
  }
};

module.exports = { getVideogameByNameController };
