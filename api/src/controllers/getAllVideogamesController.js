const { Videogame, Genre } = require("../db")
const axios = require("axios");
const { mapDataGames } = require("../helpers/mapDataGames")
const { API_KEY } = process.env

const getAllVideogamesController = async () => {
    try {

        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
            params: {
                key: API_KEY,
                page_size: 100,
            }
        })

        let apiUserData = response.data.results
        const getApi = mapDataGames(apiUserData)

        const getDb = await Videogame.findAll({
            include: {
                model: Genre
            }
        })

        let allVideogames = [...getDb, ...getApi];
        return allVideogames

    }
    catch (error) {
       throw error;

    }

}

module.exports = { getAllVideogamesController };