const { getAllGenresController } = require("../controllers/getAllGenresController");

const getAllGenresHandler = async (req, res) => {
    try {
        const genre = getAllGenresController();
        res.status(200).json(genre)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports =  { getAllGenresHandler }