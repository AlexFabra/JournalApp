import 'moment/locale/es'

import React from 'react'
import { activeNote } from '../../actions/notes';
import moment from 'moment'
import { useDispatch } from 'react-redux';

export const JournalEntry = ({id,date,title,body,url}) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    //mostraremos la nota que sea clicada:
    const handleEntryClick = () => {
        dispatch(activeNote(id,{date,title,body,url}))
    }

    return (
        <div className="journal__entry pointer" onClick={handleEntryClick}>
            {/* si el url no es undefined, se muestra la imagen de dentro del div: */}
            {url && 
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
            ></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('do')}</h4>
            </div>

        </div>
    )
}
