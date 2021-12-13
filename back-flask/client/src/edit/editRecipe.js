import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from '../helpers/axios';

export const EditRecipe = () => {
    const { recipe_id, category_id } = useParams()
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: '',
        imageURL: ''
    })
    const navigate = useNavigate()
    const getRecipe = useCallback(async () => {
        const response = await axiosInstance.get(`/recipe/${recipe_id}`);
        console.log(response.data)
        if(response.data.name) {
            setRecipe(response.data)
        }
    })

    useEffect(()=> {
        if(recipe_id != 0) {
            getRecipe()
        }
    }, [recipe_id])

    async function submitForm(e) {
        e.preventDefault()
        let recipe_uid = recipe_id
        if (recipe_id != 0) {
            await axiosInstance.put(`/recipe/${recipe_id}`, recipe)
        } else {
            const response = await axiosInstance.post(`/category/${category_id}/recipe`, recipe)
            recipe_uid = response.data.uid
        }

        navigate(`/recipe/${recipe_uid}`)
    }

    function editField(e) {
        setRecipe({...recipe, [e.target.name]: e.target.value})
    }
    return(
        <div>
            <Link to = {`/recipe/${recipe_id}`}>Atgal</Link>
            <h1>{recipe_id == 0 ? "Sukurti naują receptą" : "Redaguoti"}</h1>

            <form onSubmit={(e) => submitForm(e)}>
                <br></br><label for="name">Pavadinimas:</label>
                <input type="text" name="name" onChange={(e) => editField(e)} value={recipe.name}/>
                <br></br><label for="description">Aprašymas:</label>
                <input type="text" name="description"  onChange={(e) => editField(e)} value={recipe.description}/>
                <br></br><label for="name">Ingredientai:</label>
                <input type="text" name="ingredients"  onChange={(e) => editField(e)} value={recipe.ingredients}/>
                <br></br><label for="name">Nuotraukos nuoroda:</label>
                <input type="text" name="imageURL"  onChange={(e) => editField(e)} value={recipe.imageURL} />
                <br></br><button type="submit">Išsaugoti</button>
            </form>
        </div>     
    )
}