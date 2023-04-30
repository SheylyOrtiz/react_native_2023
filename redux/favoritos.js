import * as ActionTypes from './ActionTypes';
export const favoritos = (state = {favoritos: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
        if (){
            return{...state, excursionId: action.payload}
        }
        default:
        return state;
    }
};