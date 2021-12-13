import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import LoadingPage from '../components/loadingPage';
import { DeleteRecipe } from '../delete/deleteRecipe';
import { axiosInstance } from '../helpers/axios';
import { Comment } from '../components/comment/comment.js';
import { Form } from '../components/category/form.js';
import { useGlobalState } from '../globalContext';


export const ShowRecipe = () => {
    const { uid } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [comments, setComments] = useState(null)
    const [addComment, setAddComment] = useState('')
    const { user } = useGlobalState()

    const getComments = useCallback(async () => {
        const response = await axiosInstance.get(`/recipe/${uid}/comments`);
        setComments(response.data)
    })

    const getRecipe = useCallback(async () => {
        const response = await axiosInstance.get(`/recipe/${uid}`);
        setRecipe(response.data)
    })

    const handleFormChange = (inputValue) => {
        setAddComment(inputValue)
    }

    const handleFormSubmit = useCallback(async () => {

        const response = await axiosInstance.post(`/recipe/${uid}/comment`, { body: addComment });
        setAddComment('')
        getComments()
    })

    useEffect(()=> {
        getComments()
        getRecipe()
    }, [uid])

    return(

        recipe && comments ? 
        <div>
            <br></br>
            <Link to = {`/category/${recipe.category_id}`}>Atgal į receptų sąrašą</Link>
            <hr></hr>
            <h1>{recipe.name}</h1>
            <p><img src={recipe.imageURL} width="500" height="300" /></p>
            <p><em>{recipe.date_published}</em></p>
            <p><strong>Ingredientai: </strong> {recipe.ingredients}</p>
            <p><strong>Gaminimo eiga: </strong> {recipe.description}</p>
            <hr></hr>
            { user && ((recipe.user_id == user.auth_id) || user.is_admin) ? <DeleteRecipe uid={uid} category_id={recipe.category_id}/> : null}
            { user && ((recipe.user_id == user.auth_id) || user.is_admin) ? <Link to={`/recipe/edit/${recipe.category_id}/${uid}`}>Koreguoti</Link> : null}
            <br></br>
            <h1>
                <strong>Komentarai</strong>
            </h1>
            { user ? <Form userInput={addComment} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/> : null}
            <Comment listOfComments = {comments} recipe_id={uid}/>
            <hr></hr>
        </div>
        : <LoadingPage />     
    )
}