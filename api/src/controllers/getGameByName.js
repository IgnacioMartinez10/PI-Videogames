const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { combineAndFilterGames } = require("../utils/utilsFunctions");
const { getAllGamesFromApiByName } = require("./getAllGamesApiByName")
const { Op } = require("sequelize");


const getGamesByName = async (name) => {
  try {
    // Buscar juegos en la base de datos local
    const gamesFromDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Genre],
    });

    // Obtener juegos de la API
    const gamesFromApi = await getAllGamesFromApiByName(name);

    // Combinar y filtrar juegos duplicados
    const combinedGames = combineAndFilterGames(gamesFromDB, gamesFromApi);

    // Lanzar error si no se encuentran juegos
    if (combinedGames.length === 0) {
      throw new Error(
        `No se encontraron juegos que contengan ${name} en su nombre`
      );
    }

    return combinedGames;
  } catch (error) {
    throw new Error(error.message);
  }
};


 module.exports = {
   getGamesByName
 };
