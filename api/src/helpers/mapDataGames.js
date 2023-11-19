const mapDataGames = (arr) => {
    return arr.map((game) => {
        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres.map(genre => genre.name),
            created: false,
        }

    })

}

module.exports = { mapDataGames };
