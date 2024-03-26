import "./cards.styles.css";
import Card from "../Card/card.component";
import { useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "../Pagination/Pagination.jsx";

function Cards() {
  const [currentPage, setCurrentPage] = useState(1);

  const videogames = useSelector((state) => state.filteredGames); //conecto el estado global

  if (!Array.isArray(videogames)) {
    return <p>No se encontraron juegos.</p>;
  }

  const totalGames = videogames.length;
  const gamesPerPage = 12;

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame);
  const jose = currentGames;
  console.log(jose);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="cardsContainer">
      {currentGames?.map((game) => (
        <Card
        // si quiero mostrar algo en la card principal tengo que agregarlo aca abajo
          id={game.id}
          name={game.name}
          image={game.image}
          genres={game.genres}
          rating={game.rating}

        />
      ))}
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={totalGames}
        paginated={paginate}
      />
    </div>
  );
}

export default Cards;
