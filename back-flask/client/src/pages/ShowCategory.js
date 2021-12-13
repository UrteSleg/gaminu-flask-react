import React, { useEffect, useState, useCallback } from 'react';
import { DeleteCategory } from '../delete/deleteCategory';
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from '../globalContext';
import { axiosInstance } from '../helpers/axios';
import LoadingPage from '../components/loadingPage';
import { Recipe } from '../components/recipe/recipe.js';

export const ShowCategory = () => {
    const { user } = useGlobalState()
    const { uid } = useParams()
    const [category, setCategory] = useState(null)
    const [recipes, setRecipes] = useState(null)

    const getCategory = useCallback(async () => {
        const response = await axiosInstance.get(`/category/${uid}`);
        setCategory(response.data)
    })

    const getRecipes = useCallback(async () => {
        const response = await axiosInstance.get(`/category/${uid}/recipes`);
        setRecipes(response.data)
    })

    useEffect(()=> {
        getCategory()
        getRecipes()
    }, [uid])

    return(
        category && recipes ? <div>
            <h1>{category.title}</h1>
            {user && user.is_admin ? <Link to={`/category/edit/${uid}`}>Koreguoti</Link> : null}
            <DeleteCategory uid={uid}/>
            <hr></hr>
            <Link to = '/categories'>Atgal į kategorijų sąrašą</Link>
            { user ? <Link to={`/recipe/edit/${uid}/0`}>Sukurti Recepta</Link>:null}
            <Recipe listOfRecipes = {recipes}/>
        </div> : <LoadingPage />
    )
}