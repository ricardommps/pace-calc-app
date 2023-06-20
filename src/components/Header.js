"use client";
import styled from "styled-components";

const HeaderContainer = styled.header`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  h1 {
    color: ${props => props.theme.colors.white};
    font-weight: normal;
  }
`;

export default function Header(){
    return (
        <HeaderContainer className="App-header">
          <h1><span role="img" aria-label="Calculate your Pace">⏱️</span> Calculate your Pace!</h1>
        </HeaderContainer>
    );
}