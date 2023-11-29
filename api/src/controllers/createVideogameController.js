const { Videogame, Genre } = require("../db");

const createVideogame = async (
  id,
  name,
  description,
  genres,
  platforms,
  background_image,
  released,
  rating,
  created,
  GenreId
) => {
  const newVideogame = await Videogame.create({
    id,
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    created,
    GenreId
  });


  // Busca todos los géneros en la base de datos que coincidan con los nombres proporcionados
  const genresFromDB = await Genre.findAll({ where: { name: genres } });

  // Asocia el videojuego con los géneros encontrados
  await newVideogame.addGenres(genresFromDB);
  await newVideogame.reload({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {attributes: [] }
    }
  })

  return newVideogame;
};

module.exports = { createVideogame };
