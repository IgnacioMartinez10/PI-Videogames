const { createGameDB } = require("../controllers/gamesController");

const postGame = async (req, res) => {
  //el req trae el body del game a crear(info)
  const {
    name,
    description,
    genres,
    platforms,
    background_image,
    released,
    rating,
  } = req.body;
  if (
    !name ||
    !description ||
    !platforms ||
    !genres ||
    !background_image ||
    !released ||
    !rating
  ) {
    res.status(400).send({ error: "Falta completar todos los campos" });
  }
  try {
    const response = await createGameDB(
      name,
      description,
      genres,
      platforms,
      background_image,
      released,
      rating
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postGame,
};
