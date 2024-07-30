import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    ${(props) =>
    props.animation &&
    css`
      animation: ${props.animation} 0.6s ease-in-out;
    `}
    margin-bottom: 1rem;
  line-height: 1.4;

  @media (max-width: 1000px) {
    ${(props) =>
      props.as === "h1" &&
      css`
        font-size: 2.4rem;
      `}

    ${(props) =>
      props.as === "h2" &&
      css`
        font-size: 1.7rem;
      `}
      
    ${(props) =>
      props.as === "h3" &&
      css`
        font-size: 1.7rem;
      `}
      
    ${(props) =>
      props.as === "h4" &&
      css`
        font-size: 2.4rem;
      `}
  }
`;

export default Heading;
