const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const filterGame = (game) => {
  if (typeof game.id !== "number") {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      genres: game.Genres.map((genre) => genre.name),
      platforms: game.platforms,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      reviews: game.reviews_count,
    };
  } else {
    return {
      id: game.id,
      name: game.name,
      description: game.description_raw,
      genres: game.genres.map((genre) => genre.name),
      platforms: game.platforms.map(({ platform }) => platform.name),
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      reviews: game.reviews_count,
    };
  }
};

const infoFiltered = (arr) =>
  arr.map((game) => {
    if (typeof game.id === "number") {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map(({ platform }) => platform.name),
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        reviews: game.reviews_count,
      };
    } else {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.Genres.map((genre) => genre.name),
        platforms: game.platforms,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
      };
    }
  });

const fillDBwithGenres = async () => {
  const { data } = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const apiGenresNames = data.results.map((genre) => genre.name);
  let genresDB = await Genre.findAll();
  let genresToAdd = apiGenresNames.filter(
    (genreName) => !genresDB.includes(genreName)
  );
  if (genresToAdd.length) {
    for (let i = 0; i < genresToAdd.length; i++) {
      await Genre.create({ name: genresToAdd[i] });
    }
  }
  genresDB = await Genre.findAll();
};
module.exports = {
  infoFiltered,
  fillDBwithGenres,
  filterGame,
};
