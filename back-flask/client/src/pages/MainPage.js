import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../globalContext';
import styled from "styled-components";

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@700&display=swap');

font-size: 3em;
text-align: center;
color: #ff4d4d;
font-family: Arima Madurai;
`;

const Paragraph = styled.p`

font-size: 1.5em;
text-align: center;
`;

const Phrase = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Exo:ital,wght@1,400;1,900&display=swap');

font-size: 2em;
text-align: center;
font-family: Exo:ital;

`
const Wrapper = styled.section`
  padding: 4em;
  height: 100%;
`;

export const MainPage = ()=> {
  const {token} = useGlobalState()

  console.log(token)
    return(
    <Wrapper>
        <Title>GAMINU</Title>
        <Paragraph>Jūsų patys skaniausi receptai! Dalinkitės skaniausiais patiekalais, 
          ar tai blynai, sriuba, mėsos patiekalas ir panašiai. Taip pat, ieškokite 
          naujų receptų, išbandykite ir palikite atsiliepimus kitiems.
         </Paragraph>
        <Phrase>SKANAUS!</Phrase>
      </Wrapper>
    );
}