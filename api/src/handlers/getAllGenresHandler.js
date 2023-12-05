const {
  getAllGenresController,
} = require("../controllers/getAllGenresController");

const getAllGenresHandler = async (req, res) => {
  try {
    const genres = await getAllGenresController();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllGenresHandler };
