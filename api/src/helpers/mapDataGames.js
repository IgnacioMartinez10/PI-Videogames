const mapDataGames = (arr) => {
    return arr.map((game) => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            genres: game.genres.map(genre => genre.name),
            platforms: game.platforms,
            image: game.background_image,
            released: game.released,
            rating: game.rating,
            created: false,
        }

    })

}

module.exports = { mapDataGames };
