


  const filterGame = (game) => {
    if (typeof game.id !== 'number') {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            genres: game.Genres.map((genre) => genre.name),
            platforms: game.platforms,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating
        }
    } else {
        return {
            id: game.id,
            name: game.name,
            description: game.description_raw,
            genres: game.genres.map((genre) => genre.name),
            platforms: game.platforms.map(({ platform }) => platform.name),
            background_image: game.background_image,
            released: game.released,
            rating: game.rating
        }
    }
}


const infoFiltered = (arr) => arr.map((game) => {
  if (typeof game.id === 'number') {
      return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres.map((genre) => genre.name),
          platforms: game.platforms.map(({ platform }) => platform.name),
          background_image: game.background_image,
          released: game.released,
          rating: game.rating
      }
  } else {
      return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.Genres.map((genre) => genre.name),
          platforms: game.platforms,
          background_image: game.background_image,
          released: game.released,
          rating: game.rating
      }
  }
});
  
  module.exports = { filterGame, infoFiltered };
  
  