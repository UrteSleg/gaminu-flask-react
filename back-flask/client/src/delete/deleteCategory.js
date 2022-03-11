import React, { useCallback } from 'react'
import { axiosInstance } from '../helpers/axios';
import { useNavigate } from 'react-router-dom';
import {useGlobalState} from '../globalContext';
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export const DeleteCategory = ( {uid} ) => {
    const {user} = useGlobalState()
    const navigate = useNavigate()

    const deleteCategory = useCallback(async () => {
        const response = await axiosInstance.delete(`/category/${uid}`);
        navigate('/categories')
    })
    return(
        <>
            {user && user.is_admin ? <Button onClick={deleteCategory}>Pašalinti kategoriją</Button> : null}
        </>
    )
}