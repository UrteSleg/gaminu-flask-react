import React, { useCallback, useEffect, useState } from 'react';
import { Category } from '../components/category/category.js';
import { Form } from '../components/category/form.js';
import { axiosInstance } from '../helpers/axios';
import {useGlobalState} from '../globalContext'

export const CategoriesPage = ()=> {
    const [category, setCategory] = useState([])
    const [addCategory, setAddCategory] = useState()
    const { user } = useGlobalState()

    const getCategories = useCallback(async () => {
        const response = await axiosInstance.get('/categories');
        setCategory(response.data)
    })

    useEffect(()=> {
        getCategories()
    }, [])

    const handleFormChange = (inputValue) => {
        setAddCategory(inputValue)
        console.log(addCategory)
    }

    const handleFormSubmit = useCallback(async () => {
        const response = await axiosInstance.post(`/category`, { title: addCategory });
        setAddCategory('')
        getCategories()
    })

    return(
        <>
            {user && user.is_admin ? <Form userInput={addCategory} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>: null}
            <Category listOfCategories = {category}/>
        </>
    )
}