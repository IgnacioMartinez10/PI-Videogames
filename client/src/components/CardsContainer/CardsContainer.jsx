import style from "./CardsContainer.module.css"
import Card from "../Card/Card"
import { useSelector } from "react-redux"

const CardsContainer = () => {
    const games = useSelector(state => state.games)

    return (
        <div className={style.container}>
            {games.map(game => (
                <Card
                    key={game.id} // Agrega esta línea para proporcionar una clave única
                    id={game.id}
                    image={game.image}
                    name={game.name}
                    genres={game.genres}
                />
            ))}
        </div>
    )
}

export default CardsContainer
