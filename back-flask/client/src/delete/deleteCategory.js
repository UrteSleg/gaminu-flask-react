import React, { useCallback } from 'react'
import { axiosInstance } from '../helpers/axios';
import { useNavigate } from 'react-router-dom';
import {useGlobalState} from '../globalContext'

export const DeleteCategory = ( {uid} ) => {
    const {user} = useGlobalState()
    const navigate = useNavigate()

    const deleteCategory = useCallback(async () => {
        const response = await axiosInstance.delete(`/category/${uid}`);
        navigate('/categories')
    })
    return(
        <>
            {user && user.is_admin ? <button onClick={deleteCategory}>Pašalinti kategoriją</button> : null}
        </>
    )
}