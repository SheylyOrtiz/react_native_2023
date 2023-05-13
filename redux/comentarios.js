import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};
    //nos falta asignar el id al comentario
    case ActionTypes.ADD_COMENTARIO:
      const newComment = { ...action.payload, id: state.comentarios.length};
      return {
        ...state,
        errMess: null,
        comentarios: [...state.comentarios, newComment],
        
      };
      // return {...state, errMess: null, comentarios: state.comentarios.concat(action.payload)}

    default:
    return state;
  }
};