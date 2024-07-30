import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useMedia } from "../hooks/useMedia";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    overflow-x: hidden;

    @media (max-width: 1000px) {
      padding: 1rem 1.4rem;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    min-width: 2.4rem;
    min-height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
    margin-right: 14px;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  /* & span {
    display: none;
  } */
`;

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" title="dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>{" "}
        <li>
          <StyledNavLink to="/bookings" title="bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins" title="cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users" title="users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" title="settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
