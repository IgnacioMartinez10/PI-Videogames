import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./card.styles.css";

function Card(props) {
  const { id, name, image, genres } = props;
  return (
    <Link to={`/home/${id}`}>
      <div
        className="cardContainer"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="gameNameContainer"> Game: {name} </p>
        <p className="gameNameContainer"> Géneros: {genres}</p>
      </div>
    </Link>
  );
}

export default Card;
