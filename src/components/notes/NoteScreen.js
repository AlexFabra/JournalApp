import React, { useEffect, useRef } from 'react'
import { activeNote, startDeleting } from '../../actions/notes';
import { useDispatch, useSelector } from 'react-redux';

import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    //obtenemos la nota activa que esta guardada en el state:
    const { active: note } = useSelector(state => state.notes);

    //usamos el custom hook para obtener la información de la nota
    //y modificarla sin modificar la original:
    const [values, handleInputChange, reset] = useForm(note);

    //desestructuramos formValues
    const { body, title, id } = values;

    //useRef nos permite almacenar una variable que no redibujará el 
    //componente si cambia:
    const activeId = useRef(note.id);
    const activeUrl = useRef(note.url);

    //para que cada vez que la nota cambie muestre la nueva información
    //necesitamos useEffect
    useEffect(() => {
        //si los id's son diferentes, actualizamos el formulario
        //y asignamos el nuevo id al activo
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
        if (note.url !== activeUrl.current) {
            reset(note);
            activeUrl.current = note.url;
        }

    }, [note, reset])

    //cuando los valores del formulario cambien, se actualizará el estado de la aplicación 
    //mediante el store: llamamos a nuestra accion activeNote y le pasamos los parámetros necesarios
    useEffect(() => {
        dispatch(activeNote(values.id, { ...values }))
    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar reset= {reset} />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>

                {/* si hay url, mostraré la imagen: */}
                {(note.url) &&
                    (
                        <div className="notes__image">
                            <img
                                src={note.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>
                <button className='btn btn-danger' onClick={handleDelete}>delete</button>
        </div>
    )
}
