import { useDispatch, useSelector } from 'react-redux'

import { JournalEntries } from './JournalEntries'
import React from 'react'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {
    //creamos el useDispatch para el handleLogout. 
    //cuando se clique el logout se enviara mediante el dispatch el startLogout()
    const dispatch = useDispatch();

    const hanleLogout = () => {
        dispatch( startLogout() )
    }

    const {name} = useSelector( state => state.auth );

    const handleAddEntry=()=>{
        dispatch(startNewNote());
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <p>{name}</p>
                </h3>

                <button 
                    className="btn"
                    onClick={ hanleLogout }
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry" onClick={handleAddEntry}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
