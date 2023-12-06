const {
  getAllGames,
  getGamesByName,
} = require("../controllers/gamesController");

const getGames = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const gameByName = await getGamesByName(name);
      res.status(200).json(gameByName);
    } else {
      const allGames = await getAllGames();
      res.status(200).json(allGames);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getGames,
};
