import { Link } from "react-router-dom";
import "./navbar.styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getByName,
  getGenres,
  filterByGenres,
  gamesOrder,
  gamesOrigin,
  ratingOrder,
  resetFilters,
  resetOriginFilter,
} from "../../redux/actions";

function Navbar() {
  const dispatch = useDispatch();

  // Obtener los géneros y los filtros locales del estado global
  const genres = useSelector(state => state.filteredGenres);
  const filtrosLocales = useSelector(state => state.filtros);

  // Efecto para obtener los géneros al montar el componente
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // Estado local para la búsqueda
  const [search, setSearch] = useState("");

  // Función para resetear los filtros locales
  const reseteo = () => {
    dispatch(resetFilters(filtrosLocales));
    dispatch(resetOriginFilter());
    setSearch("");
  };

  // Función para manejar el cambio en el campo de búsqueda
  const inputSearchHandler = event => {
    event.preventDefault();
    const value = event.target.value;
    setSearch(value);
  };

  // Función para manejar la búsqueda al hacer clic en el botón
  const searchButtonHandler = event => {
    event.preventDefault();
    dispatch(getByName(search));
    setSearch("");
  };

  // Función para manejar el cambio en el filtro de géneros
  const filterHandler = e => {
    const { value } = e.target;
    dispatch(filterByGenres(value));
  };

  // Función para manejar el cambio en el filtro de origen
  const filterOrigin = e => {
    const { value } = e.target;
    dispatch(gamesOrigin(value));
  };

  // Función para manejar el cambio en el filtro de orden
  const orderHandler = e => {
    const { value } = e.target;
    dispatch(gamesOrder(value));
  };

  // Función para manejar el cambio en el filtro de rating
  const ratingHandler = e => {
    const { value } = e.target;
    dispatch(ratingOrder(value));
  };

  return (
    <>
      {/* Barra de navegación */}
      {/* Contenedor de la barra de búsqueda y filtros */}
      <div className="filtersContainer">
        {/* Filtro de géneros */}
        <div className="filterContainer">
          <select
            className="selectContainer"
            name="Genres"
            onChange={filterHandler}
          >
            <optgroup className="selectContainer" label="Géneros">
              <option
                className="selectContainer"
                value={filtrosLocales.generos}
              >
                Géneros
              </option>
              {genres?.map(genre => (
                <option value={genre} key={genre.id}>
                  {genre}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Filtro de orden */}
        <div className="filterContainer">
          <select className="selectContainer" onChange={orderHandler}>
            <optgroup label="Orden">
              <option value={filtrosLocales.alfabetico}>Todos</option>
            </optgroup>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        {/* Filtro de rating */}
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

        {/* Filtro de origen */}
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

        {/* Botón para resetear los filtros */}
        <div className="buttonResetContainer">
          <button className="buttonReset" onClick={reseteo}>
            Reset Filters
          </button>
        </div>

        {/* Formulario de búsqueda */}
        {/* <form onSubmit={searchButtonHandler}>
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
        </form> */}
      </div>
    </>
  );
}

export default Navbar;
