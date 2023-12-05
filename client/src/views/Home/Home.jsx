import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getGames } from "../../redux/actions"

const Home = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getGames());
    },[])

    return (
        <>
            <div>
                <h1>pepeloco home </h1>
                <CardsContainer />
            </div>
        </>

    )
}

export default Home



