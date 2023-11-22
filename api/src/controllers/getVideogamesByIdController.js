const { Videogame, Genre } = require("../db");
const axios = require ("axios");
const { API_KEY } = process.env

const getVideogamesByIdController = async (id) => {
    console.log('hola');
    if (isNaN(id)){
        const idDataBdd = await Videogame.findByPk(id, {
            include: {
                model: Genre,
                attributes: ["name"],
                through: { attributtes: [] },
            }
            
        })
        return idDataBdd;
    } else{
        try{
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const data = response.data;

            const idDataApi = {
                id: data.id,
                name: data.name,
                description: data.description,
                genre: data.genres,
                platforms: data.platforms,
                background_image: data.background_image,
                released: data.released,
                rating: data.rating
            };
            return idDataApi
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = { getVideogamesByIdController }