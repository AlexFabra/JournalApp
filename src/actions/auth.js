import { finishLoading, startLoading } from './ui';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import Swal from 'sweetalert2';
import { noteLogout } from './notes';
import { types } from '../types/types';

//login
export const startLoginEmailPassword = (email, password) => {
    //el dispatch (envío) se va a encargar de mandar la accion al reducer
    //se lo manda a todos los reducers, pero gracias a los tipos entra 
    //al que cumple la condición del switch
    return (dispatch) => {
        dispatch(startLoading()); //ahora ya podemos obtener los datos en loginscreen para deshabilitar el botón
        //para iniciar sesión: 
        firebase.auth().signInWithEmailAndPassword(email, password)
            //recibe el user credencial
            .then(({ user }) => {
                //enviamos la acción login:
                dispatch(login(user.uid, user.displayName));
                //quitar el loading:
                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('login user error', e.message, 'error');
            })
    }
}

//registro
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    //gracias a thunk tenemos acceso al dispatch:
    return (dispatch) => {
        //para guardar un nuevo usuario en firebase:
        //retorna una promesa y en ella podemos actualizar los datos del store
        //uid es el elemento que no se repite. 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                //grabamos el nombre en la base de datos:
                await user.updateProfile({ displayName: name });
                //actualizamos el state: 
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                console.log(e);
                Swal.fire('register user error', e.message, 'error');
            })

    }
}


//login con google:
/** creamos un Popup donde se muestran los usuarios de google y permite iniciar sesión con 
 *  el user recibido haciendo un dispatch de login (véase authReducer)
 * @returns 
 */
export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        //borramos las notas:
        dispatch(noteLogout());
    }
}


export const logout = () => ({
    type: types.logout
})


