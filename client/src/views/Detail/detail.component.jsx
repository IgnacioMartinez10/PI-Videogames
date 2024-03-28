import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGame } from "../../redux/actions";
import "./detail.styles.css"; // Importamos los estilos CSS

function Detail() {
  const { id } = useParams();
  const game = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    dispatch(getGame(id));
  }, [dispatch, id]);

  // Función para manejar el click en "ver más"
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="containerDetail">
      <div className="detailCard">
        {game && (
          <>
            <div className="backHome">
              <Link to="/home">Volver al Home</Link>
            </div>
            <div className="containerDetailCard">
              <div className="infoContainer">
                <h2 className="estiloTexto">Nombre: {game.name}</h2>
                <p className="estiloTexto">ID: {game.id}</p>
                <p className="estiloTexto">Plataformas: {game.platforms}</p>
                <p className="estiloTexto">Fecha de Lanzamiento: {game.released}</p>
                <p className="estiloTexto">Ranking: {game.rating}</p>
                <div className="genresContainer">
                  <p className="estiloTexto">Géneros: </p>
                  {game.genres &&
                    game.genres.map((genre) => (
                      <p className="estiloTexto" key={genre.id}>
                        {genre}
                      </p>
                    ))}
                </div>
                <div className="imgContainer">
                  <img className="imgDetail" src={game.background_image} alt="" />
                </div>
                <div className="description">
                  {game.description ? (showFullDescription ? game.description : `${game.description.slice(0, 200)}...`) : ''}
                  <span className="verMas" onClick={handleToggleDescription}>
                    {showFullDescription ? "Ver menos" : "Ver más"}
                  </span>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
