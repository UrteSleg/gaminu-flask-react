import React from 'react';
import styled from "styled-components";

const Input = styled.input`
  font-size: 12px;
  padding: 5px;
  margin: 10px;
  border-radius: 3px;
`;


const InputSubmit = styled.input`
    background: #00aec9;
    color: #fff;
    margin-bottom: 0;
    border-radius: 5px;
    border-color: transparent;
    box-shadow: 0px;
    outline: none;
    transition: 0.15s;
    text-align: center;
`;

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
            <></>
            <Input type='title' required placeholder="Naujas įrašas" value={userInput} onChange={handleChange}></Input>
            <InputSubmit type='submit' value = "Išsaugoti"></InputSubmit>
        </form>
    )
}