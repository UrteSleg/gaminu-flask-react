import React from 'react';

export const Form = ({ userInput, onFormChange, onFormSubmit })=> {

    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type='title' required value={userInput} onChange={handleChange}></input>
            <input type='submit' value = "Išsaugoti"></input>
        </form>
    )
}