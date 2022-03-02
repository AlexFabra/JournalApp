import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        //creamos la nota:
        const newNote = { title: '', body: '', date: new Date().getTime() }
        //referimos al a base de datos (neceesitamos obtener la id de la colección, 
        //el nombre del documento y el nombre de la colección de firestore)
        //el add regresa una promesa que resuelve el reference. 
        //como es una promesa puedo hacer la comanda async await
        //(ponemos async en el return )
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        //hacemos el dispath al reducer de la acción añadiendo el id a la nota:
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote)); 
    }
}
//active note permite que podamos editar la nota en la pantalla de edición:
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: { id, ...note }
})

export const addNewNote= (id,note) => ({
    type: types.notesAddNew,
    payload:{
        id,...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        //loadNotes hace una peticion a firebase db para obtener las notas.
        const notes = await loadNotes(uid);
        //luego guardamos las notas obtenidas en el state:
        dispatch(setNotes(notes))
    }
}
//cuando tenemos las notas tenemos que guardarlas en el state:
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

//guardamos la nota en firebase: 
export const startSaveNote = (note) => {
    //necesitamos el dispatch para usar el middelware tunk 
    //y el getState para obtener el id del usuario:
    return async (dispatch, getState) => {
        //obtenemos el id del usuario:
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }
        const noteToFirestore = { ...note };
        //borramos el id, pues no lo queremos modificar en el documento:
        delete noteToFirestore.id;
        //hacemos el update de la nota pasandole la nota actualizada sin id:
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        //actualizamos la nota del sidebar:
        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, note: { id, ...note }
    }
})
//subiremos la imagen a cloudinary
export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        //creamos un loading mientras la imagen se sube:
        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);

        activeNote.uid = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();

    }
}
export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        //borramos la nota de la base de datos:
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        //borramos la nota del store:
        //al hacer un dispatch de una acción, esta se lee por el reducer y el reducer 
        //substituye las variables.
        dispatch(deleteNote);
    }
}
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
    //no hace falta hacer esto porque el dispatch lo hace quien llama a la función(accion) noteLogout
    // return (dispatch) => {
    //     dispatch({ type: types.notesLogoutCleaning })
    // }
})

