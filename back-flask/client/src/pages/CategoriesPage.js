import React, { useCallback, useEffect, useState } from "react";
import { Category } from "../components/category/category.js";
import { Form } from "../components/category/form.js";
import { axiosInstance } from "../helpers/axios";
import { useGlobalState } from "../globalContext";
import styled from "styled-components";

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@700&display=swap");

  font-size: 3em;
  text-align: center;
  color: #17c0eb;
  font-family: Arima Madurai;
`;

const Text = styled.p`
  font-size: 1em;
  text-align: center;
`;

export const CategoriesPage = () => {
  const [category, setCategory] = useState([]);
  const [addCategory, setAddCategory] = useState();
  const { user } = useGlobalState();
  const [errorMessage, setErrorMessage] = useState("");

  const getCategories = useCallback(async () => {
    const response = await axiosInstance.get("/categories");
    setCategory(response.data);
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleFormChange = (inputValue) => {
    setAddCategory(inputValue);
    console.log(addCategory);
  };

  const handleFormSubmit = useCallback(async () => {
    const response = await axiosInstance.post(`/category`, {
      title: addCategory,
    });
    setAddCategory("");
    getCategories();
  });

  return (
    <>
      <Title>Kategorijų sąrašas</Title>
      {user && user.is_admin ? <Text>Pridėkite naują kategoriją: </Text> : null}
      {user && user.is_admin ? (
        <Form
          userInput={addCategory}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      ) : null}
      <Category listOfCategories={category} />
    </>
  ) 
};
