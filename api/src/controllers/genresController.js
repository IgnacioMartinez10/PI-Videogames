const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

const getAllGenres = async () => {
  let genresDB = await Genre.findAll();
  if (genresDB.length === 0) {
    const { data } = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresNames = data.results.map((genre) => genre.name);
    for (let i = 0; i < genresNames.length; i++) {
      await Genre.create({ name: genresNames[i] });
    }
    genresDB = await Genre.findAll();
  }
  return genresDB;
};

module.exports = { getAllGenres };
