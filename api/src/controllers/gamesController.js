const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { infoFiltered, filterGame } = require("../utils/utilsFunctions");
const { Op } = require("sequelize");

const createGameDB = async (
  name,
  description,
  genres,
  platforms,
  background_image,
  released,
  rating
) => {
  const gamePosted = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });

  const genre = await Genre.findAll({
    where: { name: genres },
  });

  await gamePosted.addGenre(genre);
  await gamePosted.reload({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  return gamePosted;
};

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

const combineAndFilterGames = (gamesFromDB, gamesFromApi) => {
  // Filtrar duplicados
  const uniqueGamesFromApi = gamesFromApi.filter((apiGame) => {
    return !gamesFromDB.some((dbGame) => dbGame.id === apiGame.id);
  });

  // Combinar juegos de la base de datos y de la API
  const combinedGames = [...gamesFromDB, ...uniqueGamesFromApi];

  return combinedGames;
};

module.exports = {
  createGameDB,
  getByIdDB,
  getAllGames,
  getGamesByName,
};
