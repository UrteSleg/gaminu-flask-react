import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../helpers/axios';
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export const DeleteComment = ( {uid} ) => {
    const navigate = useNavigate()

    const deleteComment = useCallback(async () => {
        const response = await axiosInstance.delete(`/comment/${uid}`);
        navigate(0)
    })

    return(
        <>
            <Button onClick={deleteComment}>Pašalinti</Button>
        </>
    )
}