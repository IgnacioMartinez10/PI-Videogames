import { Link } from "react-router-dom";
import "./landing.styles.css";

function Landing() {
  return (
    <div>
      <p className="landingTitle"> Welcome to Metal Games!!!</p>
      <button className="botondeinicio">
        <Link className="estiloLinks" to="/home">
          🔍
        </Link>
      </button>
    </div>
  );
}

export default Landing;
