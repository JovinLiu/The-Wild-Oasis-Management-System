import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
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

//在四个component之外，创建ModalContext，以保证所有component都可以接受到state
const ModalContext = createContext();

//1.定义parent component，接受一个children，这个children包含了按钮和窗口
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    //boardcast三个state
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

//2.第一个children component，children是按钮，他的作用是在compound内部实现了onClick时将openCode传给open方程，改变openName方便下面对暗号，
function Open({ children, openCode }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(openCode),
  });
}

//3.第二个children Component，children是窗口，他读取context提供的openName和自身的name进行对比，如果正确就打开窗口
function Window({ children, verifyCode }) {
  const { openName, close } = useContext(ModalContext);

  const { ref } = useClickOutside(close, true);

  if (openName !== verifyCode) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* 这里将onCloseModal: close作为props给被克隆的form，form内将close方程给cancel button*/}
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    //可以是under任何地方，比如通过document.querySelector()
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
