import React, { useEffect, useState, useCallback } from "react";
import { DeleteCategory } from "../delete/deleteCategory";
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../globalContext";
import { axiosInstance } from "../helpers/axios";
import LoadingPage from "../components/loadingPage";
import { Recipe } from "../components/recipe/recipe.js";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #ff386a;
  font-family: Arima Madurai;
  text-transform: uppercase;
`;

const Wrapper = styled.section`
  padding: 4em;
  hr {
    margin: 24px 0;
  }
`;

const Wrapper2 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled(Link)`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #a8ad28;
  color: #a8ad28;
  margin: 16px 0;
  padding: 0.25em 1em;
  width: max-content;
`;

export const ShowCategory = () => {
  const { user } = useGlobalState();
  const { uid } = useParams();
  const [category, setCategory] = useState(null);
  const [recipes, setRecipes] = useState(null);

  const getCategory = useCallback(async () => {
    const response = await axiosInstance.get(`/category/${uid}`);
    setCategory(response.data);
  });

  const getRecipes = useCallback(async () => {
    const response = await axiosInstance.get(`/category/${uid}/recipes`);
    setRecipes(response.data);
  });

  useEffect(() => {
    getCategory();
    getRecipes();
  }, [uid]);

  return category && recipes ? (
    <Wrapper>
      <Title>{category.title}</Title>
      {user && user.is_admin ? (
        <Button to={`/category/edit/${uid}`}>Koreguoti</Button>
      ) : null}
      <DeleteCategory uid={uid} />
      <hr></hr>
      <Wrapper2>
        <Link to="/categories">{`Atgal į kategorijų sąrašą\n`}</Link>
        {user ? (
          <Button to={`/recipe/edit/${uid}/0`}>Sukurti Recepta</Button>
        ) : null}
      </Wrapper2>
      <Recipe listOfRecipes={recipes} />
    </Wrapper>
  ) : (
    <LoadingPage />
  );
};
