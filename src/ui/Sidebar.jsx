import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transition: all 0.3s ease;

  @media (max-width: 1000px) {
    padding: 0.8rem 0.2rem;
    gap: 2rem;
    z-index: 1000;
    width: 60px;

    &:hover {
      width: 200px;
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
};

export default Sidebar;
