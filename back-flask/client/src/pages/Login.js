import React from 'react';
import { BACKEND_URI } from '../App';

export const Login = () => {

    return(
        <div>
            <h1>Login</h1>
            <a href={`${BACKEND_URI}/perform-login`}>Prisijungti</a>
        </div>     
    )
}