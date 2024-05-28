import React from "react";
import "./Pagination.styles.css";

const Pagination = ({ gamesPerPage, totalGames, paginated }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationContainer">
      <ul>
        {pageNumbers.length
          ? pageNumbers.map(number => (
              <button
                key={number}
                onClick={e => {
                  console.log(`click en pagina${number}`);
                  e.preventDefault();
                  paginated(number);
                }}
                href="#"
                className="pageNumber"
              >
                <a>{number}</a>
              </button>
            ))
          : undefined}
      </ul>
    </div>
  );
};

export default Pagination;
