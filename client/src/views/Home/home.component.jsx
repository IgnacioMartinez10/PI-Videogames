import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import Navbar from "../../components/NavBar/navbar.component";
import Cards from "../../components/CardsContainer/cards.component";
import Load from "../Loading/Loading";
import Head from "../../components/Head/Head";
import Footer from "../../components/Footer/footer.componet";

import "./home.styles.css";

function Home() {
  const videogames = useSelector(state => state.videogames);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //cuando entro a home que se haga el dispatch

  useEffect(() => {}, []);

  useEffect(() => {
    // Verificar si el estado videogames está vacío o undefined
    if (!videogames || videogames.length === 0) {
      setLoading(true);
      dispatch(getGames())
        .then(() => setLoading(false))
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [dispatch, videogames]);

  return (
    <div className="home">
      {" "}
      {/* Utiliza la clase homeContainer para envolver los elementos */}
      {loading ? (
        <Load />
      ) : (
        <div className="homeContainer">
          <Head />
          <Navbar />
          <Cards />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
