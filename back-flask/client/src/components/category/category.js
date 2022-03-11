import React from 'react';
import {Link} from "react-router-dom"
import styled from "styled-components";

const NavLink = styled(Link)`
    display: flex;
    flex-direction: column;
`;

const List = styled.ul`
  list-style: none;
  padding: 0px 20px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 1.5px solid #5F85C2;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
  text-transform: uppercase;
`;

const Wrapper = styled.section`
  padding: 4em;
  height: 100%;
`;

export const Category = ({ listOfCategories })=> {
    return(
        <Wrapper>
            {listOfCategories.map(category => { 
                return(
                    <List key={category.uid}>
                        <li>
                            <NavLink to ={`/category/${category.uid}`}>{category.title}</NavLink>
                        </li>
                    </List>
                )
            })}
        </Wrapper>
    )
}