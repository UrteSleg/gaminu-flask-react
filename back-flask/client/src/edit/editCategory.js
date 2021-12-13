import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from '../helpers/axios';

export const EditCategory = () => {
    const { uid } = useParams()
    const [category, setCategory] = useState({
        title: ''
    })
    const navigate = useNavigate()
    const getCategory = useCallback(async () => {
        const response = await axiosInstance.get(`/category/${uid}`);
        console.log(response.data)
        if(response.data.name) {
            setCategory(response.data)
        }
    })

    useEffect(()=> {
        getCategory()
    }, [])

    async function submitForm(e) {
        e.preventDefault()
        await axiosInstance.put(`/category/${uid}`, category)
        navigate(`/category/${uid}`)
    }

    function editField(e) {
        setCategory({...category, [e.target.name]: e.target.value})
    }
    return(
        <div>
            <Link to = {`/category/${uid}`}>Atgal</Link>
            <h1>Redaguoti</h1>
            <form onSubmit={(e) => submitForm(e)}>
                <input type="text" name="title" onChange={(e) => editField(e)} value={category.title}/>
                <button type="submit">Išsaugoti</button>
            </form>
        </div>     
    )
}