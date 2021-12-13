import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;
  &:hover {
    border-top: 2px solid transparent;
    border-bottom: 2px solid #00c9ff;
  }
`;

export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
        <LinkItem>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to = {`/`}>Pradžia</Link>
        </LinkItem>
        <LinkItem>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to= {`/categories`}>Receptai</Link>
        </LinkItem>
        <LinkItem>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/about`} >Apie mus</Link>
        </LinkItem>
      </LinksWrapper>
    </NavLinksContainer>
  );
}