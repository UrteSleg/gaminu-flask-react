import React from 'react';
import {Link} from "react-router-dom"


export const Category = ({ listOfCategories })=> {
    return(
        <>
            {listOfCategories.map(category => { 
                return(
                    <ul key={category.uid}>
                        <li>
                            <Link to ={`/category/${category.uid}`}>{category.title}</Link>
                        </li>
                    </ul>
                )
            })}
        </>
    )
}