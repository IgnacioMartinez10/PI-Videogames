import {GET_GAMES, GET_GAME} from "./actions"

const initialState = {
    games: [],
    gameDetail: [],
};

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_GAMES:
            return {...state, games:action.payload}
        case GET_GAME:{
            return {...state, gameDetail: action.payload}
        }
        default: 
        return{...state}
    }

}

export default rootReducer;