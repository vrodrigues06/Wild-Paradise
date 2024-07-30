import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { useMedia } from "../hooks/useMedia";

const StyledLogo = styled.div`
  text-align: center;

  ${(props) => {
    props.animation &&
      css`
        animation: ${props.animation} 0.5s ease-in-out;
      `;
  }}
  @media (max-width: 1000px) {
    ${(props) =>
      props.mobile &&
      css`
        text-align: start;
        & > img {
          height: 4.5rem;
        }
      `}
  }
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo({ animation = "", mobileVersion = "true" }) {
  const { isDarkMode } = useDarkMode();
  const matches = useMedia("(max-width: 1000px)");

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  const mobileSrc = mobileVersion ? "/logo-mobile.png" : src;

  console.log(mobileSrc);
  return (
    <StyledLogo animation={animation} mobile={mobileVersion}>
      <Img src={matches ? mobileSrc : src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
