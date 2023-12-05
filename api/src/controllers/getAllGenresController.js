const { Genre } = require("../db");
const { seederGenres } = require("../helpers/seederGenres");

const getAllGenresController = async () => {
  try {
    // Verificar si la base de datos está vacía
    const countGenres = await Genre.count();

    if (countGenres === 0) {
      // Si la base de datos está vacía, llamar al seeder para obtener y almacenar los géneros
      await seederGenres();
    }

    // Obtener todos los géneros de la base de datos
    const genres = await Genre.findAll();
    return genres;
  } catch (error) {
    throw new Error("Error al obtener los géneros desde el controlador");
  }
};

module.exports = { getAllGenresController };
