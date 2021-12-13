import React, { useEffect} from 'react';
import LoadingPage from '../components/loadingPage';
import { useGlobalDispatch } from '../globalContext';
import { useNavigate } from 'react-router';

export const AuthPage = (props) => {
    const dispatch = useGlobalDispatch()
    const navigate = useNavigate()

    useEffect(()=> {
        const params = (new URL(document.location)).searchParams;
        const token = params.get("token");

        dispatch({ type: 'LOGIN', payload: token });
        localStorage.setItem('token', token)
        navigate('/')
    }, [])


    return(
        <LoadingPage />
    )
}