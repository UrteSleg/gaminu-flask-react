import React from 'react';
import {Link} from "react-router-dom"

export const Recipe = ({ listOfRecipes })=> {
    return(
        <>
            <ul>
                {listOfRecipes.map(recipe => 
                    <li key={recipe.uid}>
                        <Link to ={`/recipe/${recipe.uid}`}>
                            <p><img src={recipe.imageURL} width="200" height="96" /></p>
                            {recipe.name}
                        </Link>
                        <br></br>
                    </li>
                )}
            </ul>
        </>
    )
}