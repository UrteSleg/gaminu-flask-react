import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import LoadingPage from '../components/loadingPage';
import { DeleteRecipe } from '../delete/deleteRecipe';
import { axiosInstance } from '../helpers/axios';
import { Comment } from '../components/comment/comment.js';
import { Form } from '../components/category/form.js';
import { useGlobalState } from '../globalContext';
import styled from "styled-components";

const Title = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@700&display=swap');

    font-size: 3em;
    text-align: center;
    color: #ff4d4d;
    font-family: Arima Madurai;
    text-transform: uppercase;
`;

const Button = styled(Link)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #A8AD28;
  color: #A8AD28;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 10em
`
const Paragraph = styled.p`
  font-size: 1.5em;
  text-align: Left;
  margin: 0 2em
`;

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
            <Title>{recipe.name}</Title>
            <p><img src={recipe.imageURL} width="500" height="300" /></p>
            <p><em>{recipe.date_published}</em></p>
            <Paragraph><strong>Ingredientai: </strong> {recipe.ingredients}</Paragraph>
            <Paragraph><strong>Gaminimo eiga: </strong> {recipe.description}</Paragraph>
            <hr></hr>
            { user && ((recipe.user_id == user.auth_id) || user.is_admin) ? <DeleteRecipe uid={uid} category_id={recipe.category_id}/> : null}
            { user && ((recipe.user_id == user.auth_id) || user.is_admin) ? <Button to={`/recipe/edit/${recipe.category_id}/${uid}`}>Koreguoti</Button> : null}
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