import React, { useCallback } from 'react'
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

export const DeleteRecipe = ( {uid, category_id} ) => {
    const navigate = useNavigate()

    const deleteRecipe = useCallback(async () => {
        const response = await axiosInstance.delete(`/recipe/${uid}`);
        navigate(`/category/${category_id}`)
    })

    return(
        <>
            <Button onClick={deleteRecipe}>Pašalinti receptą</Button>
        </>
    )
}