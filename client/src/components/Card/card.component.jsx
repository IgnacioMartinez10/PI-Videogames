import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./card.styles.css";

function Card(props) {
  const { id, name, image, genres, rating } = props;
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
        <div className="infoContainer">
          <h3 className="title"> {name} </h3>
          <p className="rating"> {rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
