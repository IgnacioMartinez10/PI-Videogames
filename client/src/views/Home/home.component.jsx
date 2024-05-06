import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import Navbar from "../../components/NavBar/navbar.component";
import Cards from "../../components/CardsContainer/cards.component";
import Load from "../Loading/Loading";
import Head from "../../components/Head/Head";

import "./home.styles.css";
import Asidebar from "../../components/AsideBar/Asidebar";

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
    <div className="homeContainer">
      {" "}
      {/* Utiliza la clase homeContainer para envolver los elementos */}
      {loading ? (
        <Load />
      ) : (
        <>
          <Head />
          <Asidebar /> {/* Agrega la barra lateral aquí */}
          <Navbar />
          <Cards />
        </>
      )}
    </div>
  );
}

export default Home;
