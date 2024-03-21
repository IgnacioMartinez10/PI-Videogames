const { Videogame, Genre } = require("../db");

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

 module.exports = {
   createGameDB,
 };
