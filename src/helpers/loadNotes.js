import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
    //hacemos la función async await para esperar que se resuelva la petición:
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();

    const notes = [];

    //optenemos el id y la data de cada documento de notes:
    notesSnap.forEach(snapHijo => {
        notes.push({
            id:snapHijo.id,
            ...snapHijo.data()
        })
    })

    return notes;
}