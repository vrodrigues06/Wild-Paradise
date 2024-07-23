import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;

  ${(props) =>
    props.animation &&
    css`
      animation: ${props.animation} 0.5s ease-in-out;
    `}
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo({ animation = "" }) {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo animation={animation}>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
