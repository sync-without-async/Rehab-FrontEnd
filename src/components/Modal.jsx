import styled from "styled-components";
import PropTypes from "prop-types";

import { hide, selectVisible } from "../redux/modalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

const Background = styled.div`
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: auto;

  &.locked {
    visibility: hidden;
  }

  &.hidden {
    opacity: 0;
  }
`;

const Content = styled.div`
  max-width: 400px;
  width: 100%;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const Modal = ({ id, className, style, children, onToggle, onHide }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectVisible(id));
  const [interactable, setInteractable] = useState(false);
  const ref = useRef(null);

  const backgroundClass = [
    isVisible ? null : "hidden",
    isVisible || interactable ? null : "locked",
  ].join(" ");

  const onClick = useCallback(
    (e) => {
      if (isVisible && ref.current && !ref.current.contains(e.target)) {
        onHide();
        dispatch(hide(id));
      }
    },
    [isVisible, ref, dispatch, id, onHide],
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClick, true);
    return () => {
      document.removeEventListener("mousedown", onClick, true);
    };
  }, [onClick]);

  useEffect(() => {
    onToggle(isVisible);
  }, [isVisible]);

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
  onHide: PropTypes.func,
};

Modal.defaultProps = {
  id: "modal",
  onToggle: () => {},
  onHide: () => {},
};

export default Modal;
