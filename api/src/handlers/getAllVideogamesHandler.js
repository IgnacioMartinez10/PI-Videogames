const { getAllVideogamesController } = require("../controllers/getAllVideogamesController")
const { getVideogameByNameController } = require("../controllers/getVideogameByNameController");

const  getAllVideogamesHandler = async (req, res) => {
    const { name } = req.query;
try{
    if(name) {
        const gameByName = await getVideogameByNameController(name);
        res.status(200).json(gameByName)
    } else{
const { getAllVideogamesController } = require("../controllers/getAllVideogamesController")
        const allVideogames = await getAllVideogamesController();
        res.status(200).json(allVideogames);
    }
}
catch(error){
    console.log(error);
    res.status(400).json({error: error.message})
}
}

module.exports = { getAllVideogamesHandler }