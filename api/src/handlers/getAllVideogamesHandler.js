const { getAllVideogamesController } = require("../controllers/getAllVideogamesController")

const  getAllVideogamesHandler = async (req, res) => {
try{
    const videogames = await getAllVideogamesController();
    res.status(200).json(videogames)
}
catch(error){
    console.log(error);
    res.status(400).json({error: error.message})
}
}

module.exports = { getAllVideogamesHandler }