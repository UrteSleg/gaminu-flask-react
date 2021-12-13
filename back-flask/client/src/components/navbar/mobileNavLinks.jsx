import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./login";
import { MenuToggle } from "./menuToggle";
import { Link } from "react-router-dom";

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
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  margin-top: 20px;
`;


const Marginer = styled.div`
  height: 3em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
            <LinksWrapper>
            <LinkItem onClick={() => setOpen(false)}>
                <Link to="/">Pradžia</Link>
            </LinkItem>
            <LinkItem onClick={() => setOpen(false)}>
                <Link to="/categories">Receptai</Link>
            </LinkItem>
            <LinkItem onClick={() => setOpen(false)}>
                <Link to="/about">Apie mus</Link>
            </LinkItem>
          <Marginer />
          <Accessibility />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}