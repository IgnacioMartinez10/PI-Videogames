import { Link } from "react-router-dom";
import "./landing.styles.css";

function Landing() {
  return (
    <div className="container">
      <div className="containerLanding">
        <div className="containerInfo">
          <span className="landingTitle"> Bienvenidos Al Pi-Videogames</span>
          <button className="botondeinicio">
            <Link className="estiloLinks" to="/home">
              Ingresar
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
