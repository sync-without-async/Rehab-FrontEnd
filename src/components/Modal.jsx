import styled from "styled-components";
import PropTypes from "prop-types";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { DispatchContext, StateContext } from "../librarys/context.js";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 99;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 0.25s;

  /* display: flex;
  justify-content: center;
  align-items: center; */

  overflow: auto;

  &.locked {
    visibility: hidden;
  }

  &.hidden {
    opacity: 0;
  }
`;

const Content = styled.div`
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  max-width: 400px;
  width: 100%;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const Modal = ({ id, className, style, children, onToggle }) => {
  const dispatch = useContext(DispatchContext);
  const { status } = useContext(StateContext);
  const [interactable, setInteractable] = useState(false);
  const ref = useRef(null);

  const isVisible = status === id;

  const backgroundClass = [
    isVisible ? null : "hidden",
    isVisible || interactable ? null : "locked",
  ].join(" ");

  const onClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch({
          type: "hide",
        });
      }
    },
    [ref, dispatch],
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClick, true);
    return () => {
      document.removeEventListener("mousedown", onClick, true);
    };
  }, [onClick]);

  useEffect(() => {
    onToggle(isVisible);
  }, [isVisible, onToggle]);

  return (
    <Background
      className={backgroundClass}
      onTransitionEnd={() => setInteractable(isVisible)}
    >
      <Content ref={ref} style={style} className={className}>
        {children}
      </Content>
    </Background>
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onToggle: PropTypes.func,
};

Modal.defaultProps = {
  id: "modal",
  onToggle: () => {},
};

export default Modal;
