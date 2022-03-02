import { types } from '../types/types';

//una vez creados los types y los reducers, creamos las acciones
//lo próximo debe ser declarar cuando se va a hacer el dispatch de estas
//acciones

export const setError = ( err ) => ({
    type: types.uietError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
})
export const finishLoading = () => ({
    type: types.uiFinishLoading
})

