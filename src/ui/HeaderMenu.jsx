import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../context/DarkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  return (
    <StyledHeaderMenu>
      <li title="user">
        <ButtonIcon onClick={() => navigate("/account")}>
          {" "}
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li title={isDarkMode ? "Toggle light-mode" : "Toggle dark-mode"}>
        <DarkModeToggle />
      </li>
      <li title="logout">
        {" "}
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
