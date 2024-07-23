import styled, { keyframes } from "styled-components";
import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";

const slideIn = keyframes`
from {
  transform: translateY(-50%) scale(0.5);
  opacity: 0;
}
to {
  transform: translateY(0%) scale(1);
  opacity: 1;
}

`;

const slideOut = keyframes`
0% {
  transform: translateY(0%) scale(1);
  opacity: 1;
}
50% {
  transform: translateY(-50%) scale(0.5);
  opacity: 0;
}
100% {
  transform: translateX(0%) scale(0.5);
  opacity: 0;
}

`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;

  animation: ${({ isclosing }) =>
      isclosing === "closing" ? slideOut : slideIn}
    0.3s ease-in-out;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = React.createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = React.useState("");
  const [isClosing, setIsClosing] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => {
    setIsClosing("closing");
    setTimeout(() => {
      setOpenId("");
      setIsClosing("");
      setIsOpen(false);
    }, 250);
  };

  const open = (id) => {
    setOpenId(id);
    setIsOpen(true);
  };

  const context = {
    openId,
    close,
    open,
    isClosing,
    position,
    setPosition,
    isOpen,
  };

  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
};

function Toggle({ id }) {
  const { openId, close, open, setPosition, isOpen } =
    React.useContext(MenuContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 2,
    });

    openId !== id || openId === "" ? open(id) : close();
  }

  return (
    <StyledToggle
      onClick={handleClick}
      disabled={openId !== "" && openId !== id}
    >
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, isClosing, position, close, isOpen } =
    React.useContext(MenuContext);
  const listRef = React.useRef();

  React.useEffect(() => {
    function handleOutsideClick(e) {
      if (isOpen && e.target !== listRef.current) {
        close();
      }
    }

    window.addEventListener("click", handleOutsideClick, true);

    return () => window.removeEventListener("click", handleOutsideClick, true);
  }, [close, isOpen]);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} isclosing={isClosing} ref={listRef}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = React.useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;

export default Menus;
