import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../helpers/axios';

export const DeleteComment = ( {uid} ) => {
    const navigate = useNavigate()

    const deleteComment = useCallback(async () => {
        const response = await axiosInstance.delete(`/comment/${uid}`);
        navigate(0)
    })

    return(
        <>
            <button onClick={deleteComment}>Pašalinti</button>
        </>
    )
}