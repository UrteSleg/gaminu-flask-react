import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../helpers/axios";
import styled from "styled-components";


const InputContainer = styled.div`
  display: flex;
  flex-direction: row;

  input {
    margin: 0 16px;
    width: 300px;
  }
  label {
    width: 200px;
  }
  margin: 16px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    margin: 16px 0;
  }

  div {
    label {
      margin-right: 16px;
    }
  }
`;

const ErrorMessage = styled.h4`color:red;`

export const EditRecipe = () => {
  const { recipe_id, category_id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    imageURL: "",
  });
  const navigate = useNavigate();
  const getRecipe = useCallback(async () => {
    const response = await axiosInstance.get(`/recipe/${recipe_id}`);
    console.log(response.data);
    if (response.data.name) {
      setRecipe(response.data);
    }
  });

  useEffect(() => {
    if (recipe_id != 0) {
      getRecipe();
    }
  }, [recipe_id]);

  const [errorMessage, setErrorMessage] = useState("");
  async function submitForm(e) {
    e.preventDefault();

    if (agreed === false) {
      setErrorMessage("Privaloma sutikti su sąlyga");
    } else {
      if (recipe.name === "" || recipe.description === "" || recipe.ingredients === "" || recipe.imageURL === "") {
        setErrorMessage("Privaloma užpildyti visus laukus");
      } else {
        let recipe_uid = recipe_id;
        if (recipe_id != 0) {
          await axiosInstance.put(`/recipe/${recipe_id}`, recipe);
        } else {
          const response = await axiosInstance.post(
            `/category/${category_id}/recipe`,
            recipe
          );
          recipe_uid = response.data.uid;
        }
        navigate(`/recipe/${recipe_uid}`);
      }
    }
  }

  function editField(e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }
  const [agreed, setAgreed] = useState(false);

  return (
    <Wrapper>
      {recipe_id == 0 ? (<Link to={`/category/${category_id}`}>Atgal</Link>):(<Link to={`/recipe/${recipe_id}`}>Atgal</Link>)}
      <h1>{recipe_id == 0 ? "Sukurti naują receptą" : "Redaguoti"}</h1>
      <ErrorMessage>
      {errorMessage}
      </ErrorMessage>

      <form onSubmit={(e) => submitForm(e)}>
        <InputContainer>
          <label htmlFor="name">Pavadinimas:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => editField(e)}
            value={recipe.name}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="description">Aprašymas:</label>
          <input
            type="text"
            name="description"
            onChange={(e) => editField(e)}
            value={recipe.description}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="name">Ingredientai:</label>
          <input
            type="text"
            name="ingredients"
            onChange={(e) => editField(e)}
            value={recipe.ingredients}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="name">Nuotraukos nuoroda:</label>
          <input
            type="text"
            name="imageURL"
            onChange={(e) => editField(e)}
            value={recipe.imageURL}
          />
        </InputContainer>

        <ButtonsContainer>
          <div>
            <label>Tvirtinu, jog nekeliu žeidžiančios ir klaidingos informacijos</label>
            <input
              value={agreed}
              type="checkbox"
              onChange={(e) => setAgreed(e.target.checked)}
            />
          </div>

          <button type="submit">Išsaugoti</button>
        </ButtonsContainer>
      </form>
    </Wrapper>
  );
};
