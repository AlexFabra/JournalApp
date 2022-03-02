import React, { useEffect, useState } from 'react';
import {
    Redirect,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { firebase } from '../firebase/firebase-config'
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { useDispatch } from 'react-redux';

export const AppRouter = () => {

    const dispatch = useDispatch();
    //este estate es para controlar la revisión del estado de firebase:
    //mientras no sepamos que se está autenticado, está en true
    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        //cuando la autenticacion cambia:    
        firebase.auth().onAuthStateChanged( async(user) => {
            //si el user es diferente de null, estamos autenticados
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                //para mostrar las notas (este es el primer momento donde
                //tenemos el uid, que es lo necesario para mostrar las notas. )
                dispatch(startLoadingNotes(user.uid));
            } else { 
                setIsLoggedIn( false );
            }

            setChecking(false);

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
