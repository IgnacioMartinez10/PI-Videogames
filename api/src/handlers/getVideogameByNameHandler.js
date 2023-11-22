const { getVideogameByNameController } = require ("../controllers/getVideogameByNameController")

const getVideogameByNameHandler = async (req, res) => {
const { name } = req.query;
try{
    const videogame = await getVideogameByNameController(name)
    res.status(200).json(videogame);
}
catch(error){
    res.status(400).json({error: error.message})
}
}

module.exports = { getVideogameByNameHandler }