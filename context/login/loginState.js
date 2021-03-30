import React, {useReducer} from 'react';
import LoginReducer from './loginReducer';
import LoginContext from './loginContext';
import {RESTORE_TOKEN,SIGN_IN,SIGN_OUT} from '../../types';

const LoginState = props => {

    const inicialState = {
        isLoading: true,
        isSignout: false,
        userToken: null,
    }

    const [state, dispatch] = useReducer(LoginReducer, inicialState);

    const bootstrapAsync  = (userToken) => {
        dispatch({
            type: RESTORE_TOKEN,
            token: userToken
        })
    }

    const cerrarSesion = () => {
        dispatch({ 
            type: SIGN_OUT, 
            token: 'dummy-auth-token' 
        });
    }

    const iniciarSesion = () => {
        dispatch({ 
            type: SIGN_IN, 
            token: 'dummy-auth-token' 
        });
    }

    

    return (
        <LoginContext.Provider
            value={{
                userToken: state.userToken,
                isLoading: state.isLoading,
                bootstrapAsync,
                cerrarSesion,
                iniciarSesion
               
            }}
        >
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;