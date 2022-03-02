import { removeError, setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    //para obtener el nuevo state usamos el useSelector (solo queremos el ui, donde está el msgError)
    const { msgError } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;


    /** handleRegister se dispara cuando se clica el botón del formulario de registro:
     */
    const handleRegister = (e) => {
        //para que no haga la propagación del formulario por el url:
        e.preventDefault();
        //condición para manejo de errores del formulario: 
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    /** analiza si el formulario es válido
     * 
     *  hace dispatch del error o de la falta de error según las condiciones que incumple
     *  mediante la acción setError o removeError
     * 
     *  esto hace que se actualize el state de manera controlada.
     * 
     *  condiciones:
     *  el nombre no debe estar vacío
     *  el email debe contener un email
     *  los passwords deben ser iguales y mayores a 5
     * 
     * @returns true cuando el formulario es válido
     */
    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false;
        } else if (!validator.isEmail(email)) { //hacemos esto mediante la librería validator 
            dispatch(setError('Email is not valid'))
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                {
                    //si el mensaje de error no es null, se muestra:
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
