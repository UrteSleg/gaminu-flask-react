import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  width: 100%;
`;

const Wrapper = styled.section`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    justify-items: center;
    align-items: center;
    grid-column-gap: 16px;
    padding-inline-start: 0px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 16px 0;
  }

  img {
   max-width: 280px;
   height: auto;
  @media (max-width: 768px) {
    max-width: 200px;
  }
  }
`;

const Title = styled.h2 `
  font-size: 1em;
  text-align: center;
  text-transform: uppercase;
`;

export const Recipe = ({ listOfRecipes }) => {
  return (
    <Wrapper>
      <ul>
        {listOfRecipes.map((recipe) => (
          <NavLink to={`/recipe/${recipe.uid}`}>
            <li key={recipe.uid}>
              <img src={recipe.imageURL} />
              <Title>{recipe.name}</Title>
            </li>
          </NavLink>
        ))}
      </ul>
    </Wrapper>
  );
};
