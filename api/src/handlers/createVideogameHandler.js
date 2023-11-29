const { createVideogame } = require("../controllers/createVideogameController");

const createVideogameHandler = async (req, res) => {
    try{
        const { id, name, description, genres, platforms, background_image, released, rating, created, GenreId } = req.body
        const newVideogame = await createVideogame( id, name, description, genres, platforms, background_image, released, rating, created, GenreId );
        res.status(201).json(newVideogame);
    }
    catch(error){
        res.status(400).json({error: error.message})

    }
} 

module.exports = { createVideogameHandler };
