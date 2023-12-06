const axios = require("axios");
const { Genre } = require("../db"); // Asegúrate de ajustar el import al modelo correcto en tu aplicación
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const obtenerGenerosUnicos = (resultados) => {
    if (!Array.isArray(resultados)) {
        console.error('La variable "resultados" no es un array válido.');
        return [];
    }

    const generosUnicos = new Set();

    resultados.forEach((juego) => {
        if (juego.genres && Array.isArray(juego.genres)) {
            juego.genres.forEach((genero) => {
                generosUnicos.add(genero.name);
            });
        }
    });
    return Array.from(generosUnicos);
};

const seederGenres = async () => {
    try {
        const response = await axios.get(URL);
        const resultados = response.data.results; // Cambiado de 'resultados' a 'response.data.results'
        const generosUnicos = obtenerGenerosUnicos(resultados).map((genero) => ({ name: genero }));

        await Genre.bulkCreate(generosUnicos);

        console.log('Géneros únicos guardados en la base de datos.', generosUnicos.map((g) => g.name));

    } catch (error) {
        console.log(error);
    }
};

module.exports = { seederGenres };
