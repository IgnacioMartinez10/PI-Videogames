import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGame } from "../../redux/actions";
import "./detail.styles.css"; // Importamos los estilos CSS
import Head from "../../components/Head/Head";

function Detail() {
  const { id } = useParams();
  const game = useSelector(state => state.gameDetail);
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
      <Head />
      <div className="backHome">
        <Link to="/home" className="back">
          {" "}
          Volver al home{" "}
        </Link>
      </div>
      <div className="detailCard">
        {game && (
          <>
            <div className="infoContainer">
              <div className="data">
                <h2 className="estiloTexto">Nombre: {game.name}</h2>
                <p className="estiloTexto">ID: {game.id}</p>
                <p className="estiloTexto">
                  Plataformas: {game.platforms + " ,"}
                </p>
                <p className="estiloTexto">
                  Fecha de Lanzamiento: {game.released}
                </p>
                <p className="estiloTexto">Ranking: ⭐{game.rating}</p>

                <p className="estiloTexto">
                  Géneros:
                  {game.genres &&
                    game.genres.map(genre => (
                      <p className="estiloTexto" key={genre.id}>
                        {genre}
                      </p>
                    ))}{" "}
                </p>

                <div className="imgContainer">
                  <img
                    className="imgDetail"
                    src={game.background_image}
                    alt=""
                  />
                </div>
              </div>

              <div className="description">
                {game.description
                  ? showFullDescription
                    ? game.description
                    : `${game.description.slice(0, 200)}...`
                  : ""}
                <span className="verMas" onClick={handleToggleDescription}>
                  {showFullDescription ? "Ver menos" : "Ver más"}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
