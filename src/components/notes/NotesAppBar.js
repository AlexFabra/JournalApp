import { startSaveNote, startUploading } from '../../actions/notes';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react'

export const NotesAppBar = ({reset}) => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureClick = () => {
        //simulamos un click en el fileSelector, que es un input escondido, para que 
        //se nos abra el explorador de archivos:
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file));
            reset(active);
        }
    }

    return (
        <div className="notes__appbar">

            <span>dia y hora</span>

            <input id="fileSelector" name="file" type='file' style={{display:'none'}} onChange={handleFileChange}/>

            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>

        </div>
    )
}
