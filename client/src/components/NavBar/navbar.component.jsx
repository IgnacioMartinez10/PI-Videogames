import { Link } from "react-router-dom";
import "./navbar.styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getByName,
  getGames,
  getGenres,
  filterByGenres,
  gamesOrder,
  gamesOrigin,
  ratingOrder,
  resetFilters,
} from "../../redux/actions";

function Navbar() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.filteredGenres);
  const filtrosLocales = useSelector((state) => state.filtros);

  console.log(genres);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [search, setSearch] = useState("");

  const reseteo = () => {
    dispatch(resetFilters(filtrosLocales));
    setSearch("");
  };

  const inputSearchHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearch(value);
  };

  const searchButtonHandler = (event) => {
    event.preventDefault();
    dispatch(getByName(search));
    setSearch("");
  };
  const homeLinkHandler = () => {
    dispatch(getGames());
  };

  const filterHandler = (e) => {
    const { value } = e.target;
    dispatch(filterByGenres(value));
  };

  const filterOrigin = (e) => {
    const { value } = e.target;
    dispatch(gamesOrigin(value));
  };

  const orderHandler = (e) => {
    const { value } = e.target;
    dispatch(gamesOrder(value));
  };

  const ratingHandler = (e) => {
    const { value } = e.target;
    dispatch(ratingOrder(value));
  };

  return (
    <>
      <div className="ContainNavbar">
        <div className="navbar">
          <Link to="/create" className="linksContainer">
            Crear un videojuego
          </Link>
        </div>
      </div>
      <div className="searchBarContainer">
        <div className="filterContainer">
          <select
            className="selectContainer"
            name="Genres"
            onChange={filterHandler}
          >
            <optgroup label="Géneros">
              <option value={filtrosLocales.generos}>Géneros</option>
              {genres?.map((genre) => (
                <option value={genre} key={genre.id}>
                  {genre}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className="filterContainer">
          <select className="selectContainer" onChange={orderHandler}>
            <optgroup label="Orden">
              <option value={filtrosLocales.alfabetico}>Orden</option>
            </optgroup>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className="filterContainer">
          <select
            className="selectContainer"
            name="Rating"
            onChange={ratingHandler}
          >
            <optgroup label="Rating">
              <option value={filtrosLocales.rating}>Rating</option>
              <option value="menor">Menor Rating</option>
              <option value="mayor">Mayor Rating</option>
            </optgroup>
          </select>
        </div>
        <div className="filterContainer">
          <select
            className="selectContainer"
            name="Origen"
            onChange={filterOrigin}
          >
            <optgroup label="Origen">
              <option value={filtrosLocales.origen}>Todos</option>
              <option value="api">API</option>
              <option value="db">DB</option>
            </optgroup>
          </select>
        </div>
        <div>
          <button className="buttonReset" onClick={reseteo}>
            Reset Filtros
          </button>
        </div>
        <form onSubmit={searchButtonHandler}>
          <input
            className="selectContainer"
            placeholder="Busca tu juego"
            type="search"
            value={search}
            onChange={inputSearchHandler}
          />
          <button className="buttonSearch" type="Submit">
            Buscar
          </button>
        </form>
      </div>
      ;
    </>
  );
}

export default Navbar;
