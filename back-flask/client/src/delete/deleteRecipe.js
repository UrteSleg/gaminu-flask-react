import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../helpers/axios';

export const DeleteRecipe = ( {uid, category_id} ) => {
    const navigate = useNavigate()

    const deleteRecipe = useCallback(async () => {
        const response = await axiosInstance.delete(`/recipe/${uid}`);
        navigate(`/category/${category_id}`)
    })

    return(
        <>
            <button onClick={deleteRecipe}>Pašalinti receptą</button>
        </>
    )
}