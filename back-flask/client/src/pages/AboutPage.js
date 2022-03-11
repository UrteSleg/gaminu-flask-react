import React from 'react';
import styled from "styled-components";

const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@700&display=swap');

font-size: 3em;
text-align: center;
color: #3ab600;
font-family: Arima Madurai;
`;

const Paragraph = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@700&display=swap');

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
`;

export const AboutPage = ()=> {
    return(
    <Wrapper>
        <Title>Apie mus</Title>
        <Paragraph>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</Paragraph>
 
        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </Wrapper>
    );
}