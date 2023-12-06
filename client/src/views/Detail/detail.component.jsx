import { useDispatch, useSelector } from "react-redux";
import "./detail.styles.css";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { getGame } from "../../redux/actions";

function Detail() {
  const { id } = useParams();

  const game = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGame(id));
  }, [dispatch, id]);
  return (
    <div>
      {game && (
        <div
          className="detailContainer"
          style={{
            backgroundImage: `url(${game.background_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link to="/home" className="estiloLink">
            Volver Al Home
          </Link>
          <div className="infoContainer">
            <h2 className="estiloTexto">Nombre: {game.name}</h2>
            <h2 className="estiloTexto">ID: {game.id}</h2>
            <h2 className="estiloTexto">Plataformas: {game.platforms}</h2>
            <h2 className="estiloTexto">
              Fecha de Lanzamiento: {game.released}
            </h2>
            <h2 className="estiloTexto">Ranking: {game.rating}</h2>
            <div className="genresContainer">
              <h2 className="estiloTexto">Géneros: </h2>
              {game.genres &&
                game.genres.map((genre) => (
                  <h2 className="estiloTexto" key={genre.id}>
                    {genre}
                  </h2>
                ))}
            </div>
          </div>

          <div className="description">{game.description}</div>
        </div>
      )}
    </div>
  );
}

export default Detail;
