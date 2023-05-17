import * as ActionTypes from './ActionTypes';
//import { baseUrl } from '../comun/comun';
import app from '../firebaseConfig';
import 'firebase/database';
import { getDatabase, ref, onValue, push } from "firebase/database";


export const fetchComentarios = () => (dispatch) => {
    const database = getDatabase(app);
    const comentariosRef = ref(database, "comentarios");
  
    // Suscribirse a los cambios de los datos en tiempo real
    onValue(comentariosRef, (snapshot) => {
      const comentarios = snapshot.val();
      dispatch(addComentarios(comentarios));
    }, (error) => {
      dispatch(comentariosFailed(error.message));
    });
  };
export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});
// export const postComentario = (comentario) => (dispatch) => {
//     setTimeout(() => {
//         dispatch(addComentario(comentario));
//     }, 2000);
// };
export const postComentario = (comentario) => (dispatch) => {
    try {
      const database = getDatabase(app); // Obtiene una instancia de Realtime Database
      const comentariosRef1 = ref(database, "comentarios"); // Obtiene la referencia a la ubicación 'comentarios' en Realtime Database
      push(comentariosRef1, comentario); // Agrega el comentario a la ubicación 'comentarios'
      dispatch(addComentario(comentario)); // Dispatch una acción para agregar el comentario al estado de la aplicación
    } catch (error) {
      dispatch(comentariosFailed(error.message)); // Dispatch una acción en caso de error
    }
 };
export const addComentario = (comentario) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: comentario
});
export const fetchExcursiones = () => (dispatch) => {

    dispatch(excursionesLoading());

    const database = getDatabase(app);
    const excursionesRef = ref(database, "excursiones");
  
    // Suscribirse a los cambios de los datos en tiempo real
    onValue(excursionesRef, (snapshot) => {
      const excursiones = snapshot.val();
      dispatch(addExcursiones(excursiones));
    }, (error) => {
      dispatch(excursionesFailed(error.message));
    });
};

export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

export const fetchCabeceras = () => (dispatch) => {
    
    dispatch(cabecerasLoading());

    const database = getDatabase(app);
    const cabecerasRef = ref(database, "cabeceras");
  
    // Suscribirse a los cambios de los datos en tiempo real
    onValue(cabecerasRef, (snapshot) => {
      const cabeceras = snapshot.val();
      dispatch(addCabeceras(cabeceras));
    }, (error) => {
      dispatch(cabecerasFailed(error.message));
    });
};

export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

export const fetchActividades = () => (dispatch) => {
    
    dispatch(actividadesLoading());

    const database = getDatabase(app);
    const actividadesRef = ref(database, "actividades");
  
    // Suscribirse a los cambios de los datos en tiempo real
    onValue(actividadesRef, (snapshot) => {
      const actividades = snapshot.val();
      dispatch(addActividades(actividades));
    }, (error) => {
      dispatch(actividadesFailed(error.message));
    });
};

export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});


export const postFavorito = (excursionId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId));
    }, 2000);
};
export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});

   