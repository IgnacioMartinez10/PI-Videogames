import { useDispatch, useSelector } from 'react-redux';
import style from "./Detail.module.css";
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { getGame } from '../../redux/actions';

function Detail() {
    const { id } = useParams();
    const game = useSelector(state => state.gameDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGame(id));
    }, [dispatch, id]);

    console.log("Game data:", game);

    return (
        <div>
            {game && (
                <div
                    className={style.detailContainer}
                    style={{
                        backgroundImage: `url(${game.background_image})`,
                        backgroundSize: 'cover',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                    }}
                >
                    <Link to='/home' className={style.estiloLink}>
                        Back Home
                    </Link>
                    <div className={style.infoContainer}>
                        <h2 className={style.estiloTexto}>Nombre: {game.name}</h2>
                        <h2 className={style.estiloTexto}>ID: {game.id}</h2>
                        <h2 className={style.estiloTexto}>
                            Plataformas: {game.platforms && game.platforms.map(platform => platform.platform.name).join(', ')}
                        </h2>

                        <h2 className={style.estiloTexto}>
                            Fecha de Lanzamiento: {game.released}
                        </h2>
                        <h2 className={style.estiloTexto}>Ranking: {game.rating}</h2>
                        <div className={style.genresContainer}>
                            <h2 className={style.estiloTexto}>Géneros: </h2>
                            {game.genre && game.genre.map(genre => (
                                <h2 className={style.estiloTexto} key={genre.id}>{genre.name}</h2>
                            ))}
                        </div>
                        <div className={style.description}>{game.description}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
