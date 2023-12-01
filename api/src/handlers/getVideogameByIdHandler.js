const { getVideogamesByIdController } = require ("../controllers/getVideogamesByIdController")

const getVideogamesByIdHandler = async (req, res) => {

    const { id } = req.params;
    console.log(req.params.id);

    const source = isNaN(id) ? 'bdd' : 'api';

    try {
        const videogame = await getVideogamesByIdController(id, source)
        res.status(200).json(videogame)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getVideogamesByIdHandler }