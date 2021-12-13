import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from '../helpers/axios';

export const EditComment = () => {
    const { recipe_id, uid } = useParams()
    const [comment, setComment] = useState({
        body: ''
    })
    const navigate = useNavigate()
    const getComment = useCallback(async () => {
        const response = await axiosInstance.get(`/comment/${uid}`);
        console.log(response.data)
        if(response.data.name) {
            setComment(response.data)
        }
    })

    useEffect(()=> {
        if(uid != 0) {
            getComment()
        }
    }, [uid])

    async function submitForm(e) {
        e.preventDefault()
        await axiosInstance.put(`/comment/${uid}`, comment)
        navigate(`/recipe/${recipe_id}`)
    }

    function editField(e) {
        setComment({...comment, [e.target.name]: e.target.value})
    }
    return(
        <div>
            <Link to = {`/recipe/${recipe_id}`}>Atgal</Link>
            <h1>Redaguoti</h1>
            <form onSubmit={(e) => submitForm(e)}>
                <input type="text" name="body" onChange={(e) => editField(e)} value={comment.body}/>
                <button type="submit">Išsaugoti</button>
            </form>
        </div>     
    )
}