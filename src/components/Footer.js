"use client";
import styled from "styled-components";

const FooterContainer = styled.header`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  text-align: center;
  margin: 2em auto;
  color: ${props => props.theme.colors.purpleLight};
`;

export default function Footer(){
    return (
        <FooterContainer>
          Created with{" "}
          {" "}by Ricardo Matta
        </FooterContainer>
      );
}