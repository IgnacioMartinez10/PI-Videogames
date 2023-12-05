import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Card.module.css";

function Card(props) {
  const { id, name, image, genres } = props;

  return (
    <Link to={`/detail/${id}`}>
      <div
        className={style.cardContainer}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className={style.gameNameContainer}> Juego: {name} </p>
        <p className={style.gameNameContainer}> Géneros: {genres}</p>
      </div>
    </Link>
  );
}

export default Card;
