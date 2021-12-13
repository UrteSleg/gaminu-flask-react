import React from "react";
import styled from "styled-components";
import { useGlobalState, useGlobalDispatch } from "../../globalContext";
import { BACKEND_URI } from "../../App";

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const LoginButton = styled.div`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  border-radius: 20px;
  background-color: #6adf76;
  background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #00c9ff;
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }

  button, a {
    background: none;
    border: 0;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
  }
`;

export function Accessibility(props) {
  const dispatch = useGlobalDispatch()
  const {user} = useGlobalState()

  function handleLogout(e) {
    e.preventDefault();

    dispatch({type: "LOGOUT", payload: null})
  }

  return (
    <AccessibilityContainer>
      <LoginButton>
        {user
          ? <button onClick={(e) => handleLogout(e)}>Atsijungti </button> 
          : <a href={`${BACKEND_URI}/perform-login`}>Prisijungti</a>}
      </LoginButton>
    </AccessibilityContainer>
  );
}