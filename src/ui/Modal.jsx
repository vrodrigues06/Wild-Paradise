import styled, { css, keyframes } from "styled-components";
import React, { useContext } from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

const scaleUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.02);
  }
  75% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.04);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.0);
  }
`;

const scaleDown = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
`;

const fadeOverlayIn = keyframes`
  from {
    opacity: 0.7;
    
  }
  to {
    opacity: 1;

  }
`;

const fadeOverlayOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  /* animation: ${scaleUp} 0.3s ease-in-out; */
  animation: ${({ isclosing }) => (isclosing ? scaleDown : scaleUp)} 0.3s
    ease-in;

  @media (max-width: 900px) {
    & > div form {
      max-width: 50rem;
    }
  }

  @media (max-width: 650px) {
    & > div form {
      max-width: 40rem;
    }
  }
  @media (max-width: 500px) {
    & > div form {
      max-width: 30rem;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(2px);

  z-index: 1000;
  /* animation: ${fadeOverlayIn} 0.3s ease-in-out; */
  animation: ${({ isclosing }) =>
    isclosing
      ? css`
          ${fadeOverlayIn} 0.3s ease-in
        `
      : css`
          ${fadeOverlayOut} 0.2s ease-in
        `};
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

export const ModalContext = React.createContext();

function Modal({ children }) {
  const [openName, setOpenName] = React.useState("");
  const [isClosing, setIsClosing] = React.useState("");

  // const close = () => setOpenName("");
  const close = () => {
    setIsClosing("open");
    setTimeout(() => {
      setIsClosing("");
      setOpenName("");
    }, 200); //
  };

  const open = setOpenName;

  const context = {
    openName,
    close,
    open,
    isClosing,
  };

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return React.cloneElement(children, { onClick: () => open(opensWindowName) });
}

const Window = ({ children, name }) => {
  const { openName, close, isClosing } = React.useContext(ModalContext);
  const modalContainer = React.useRef();

  if (name !== openName) return null;

  return createPortal(
    <Overlay
      ref={modalContainer}
      onClick={(e) => {
        if (e.target === modalContainer.current) close();
      }}
      isclosing={isClosing}
    >
      <StyledModal isclosing={isClosing}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{React.cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
