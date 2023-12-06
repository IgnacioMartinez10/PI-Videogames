const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { infoFiltered, filterGame } = require("../utils/utilsFunctions");
const { Op } = require("sequelize");

//Postear un nuevo juego

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
  //for (const genreName of genres) {
  //    const [genresPosted, created] = await Genre.findOrCreate({
  //        where: { name: genreName },
  //        default: { name: genreName}
  //    });
  //    if(!created) throw new Error ('Ese genero ya existe')
  //
  //    await gamePosted.addGenre(genresPosted);
  //}
}; //sequelize me permite usar la funcion .create como si usara el CREATE en SQL

// Obtener el detail de un juego por ID

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
      await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
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
};

const getAllGames = async () => {
  const allGamesFromDB = await Videogame.findAll({ include: [Genre] });
  let allGamesFromDBFiltered = infoFiltered(allGamesFromDB);
  let gamesFromApi = [];

  for (let i = 1; i < 6; i++) {
    let allGamesFromApiFullInfo = (
      await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
    ).data.results;
    let allGamesFromApiFiltered = infoFiltered(allGamesFromApiFullInfo);
    gamesFromApi.push(allGamesFromApiFiltered);
  }
  let allGames = [];
  gamesFromApi.map((el) => {
    allGames = allGames.concat(el);
  });

  return [...allGamesFromDBFiltered, ...allGames];
};

module.exports = {
  createGameDB,
  getByIdDB,
  getAllGames,
  getGamesByName,
};
