/*
{
    notes: [], 
    //o null o el objeto de la nota activa
    active: null, 
    active: {
        id:'1234R2GRYHG3QRH',
        title: '',
        body:'',
        imageUrl:'',
        date:12/12/21
    }
}
*/

import { types } from "../types/types";

//estado inicial de las notas:
//ninguna nota y ninguna seleccionada.
const initialState = {
    notes: [],
    active: null
}

//cada vez que se hace un dispatch con un tipo se activa este reducer
export const notesReducer = (state, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload,...state.notes]
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        case types.notesUpdated: //retorna la nota actualizada
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }
        case types.notesDelete:
            return {
                ...state,
                active: null,
                //regresa todas excepto la que está en el payload, que es la que queremos borrar:
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
        default:
            return initialState;
    }
}