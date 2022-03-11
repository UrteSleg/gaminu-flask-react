import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../helpers/axios";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2em;
  height: 100%;
`;

export const EditComment = () => {
  const { recipe_id, uid } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const ErrorMessage = styled.h4`color:red;`
  const [comment, setComment] = useState({
    body: "",
  });
  const navigate = useNavigate();
  const getComment = useCallback(async () => {
    const response = await axiosInstance.get(`/comment/${uid}`);
    console.log(response.data);
    if (response.data.name) {
      setComment(response.data);
    }
  });

  useEffect(() => {
    if (uid != 0) {
      getComment();
    }
  }, [uid]);

  async function submitForm(e) {
    if (comment.body === "") {
      e.preventDefault();
      setErrorMessage("Privaloma užpildyti visus laukus");
    } else {
    e.preventDefault();
    await axiosInstance.put(`/comment/${uid}`, comment);
    navigate(`/recipe/${recipe_id}`);
    }
  }

  function editField(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }
  return (
    <Wrapper>
      <Link to={`/recipe/${recipe_id}`}>Atgal</Link>
      <h1>Redaguoti</h1>
      <ErrorMessage>
      {errorMessage}
      </ErrorMessage>
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          name="body"
          onChange={(e) => editField(e)}
          value={comment.body}
        />
        <button type="submit">Išsaugoti</button>
      </form>
    </Wrapper>
  );
};
