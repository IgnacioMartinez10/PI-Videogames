const { Videogame, Genre } = require("../db")
const axios = require("axios");
const { infoFiltered } = require("../helpers/mapDataGames")
const { API_KEY } = process.env

const getAllVideogamesController = async () => {

    let gamesFromApi = [];
    try {

        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)

        let apiUserData = response.data.results
        const getApiFiltered = infoFiltered(apiUserData)
        gamesFromApi.push(getApiFiltered)

        const getDb = await Videogame.findAll({
            include: {
                model: Genre
            }
        })

        let allVideogames = [...getDb, ...getApiFiltered];
        return allVideogames

    }
    catch (error) {
       throw error;

    }

}

module.exports = { getAllVideogamesController };