import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../helpers/axios";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2em;
  height: 100%;
`;

export const EditCategory = () => {
  const { uid } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const ErrorMessage = styled.h4`color:red;`
  const [category, setCategory] = useState({
    title: "",
  });
  const navigate = useNavigate();
  const getCategory = useCallback(async () => {
    const response = await axiosInstance.get(`/category/${uid}`);
    if (response.data.name) {
      setCategory(response.data);
    }
  });

  useEffect(() => {
    getCategory();
  }, []);

  async function submitForm(e) {
    if (category.title === "") {
      e.preventDefault();
      setErrorMessage("Privaloma užpildyti visus laukus");
    } else {
    e.preventDefault();
    await axiosInstance.put(`/category/${uid}`, category);
    navigate(`/category/${uid}`);
    }
  }

  function editField(e) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }
  return (
    <Wrapper>
      <Link to={`/category/${uid}`}>Atgal</Link>
      <h1>Redaguoti</h1>
      <ErrorMessage>
      {errorMessage}
      </ErrorMessage>
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          name="title"
          onChange={(e) => editField(e)}
          value={category.title}
        />
        <button type="submit">Išsaugoti</button>
      </form>
    </Wrapper>
  );
};
