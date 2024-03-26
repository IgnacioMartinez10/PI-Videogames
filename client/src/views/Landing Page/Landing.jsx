import { Link } from "react-router-dom";
import "./landing.styles.css";

function Landing() {
  return (
    <div className="container">
      <div className="containerLanding">
        <div className="containerInfo">
          <span className="landingTitle">Pi-Videogames</span>
          <div className="botondeinicio">
            <Link className="estiloLinks" to="/home">
              INGRESAR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
