import styled from "styled-components";
import PropTypes from "prop-types";

import { hide, selectVisible } from "../../redux/modalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: opacity 0.25s;

  &.locked {
    visibility: hidden;
  }

  &.hidden {
    opacity: 0;

    & > div {
      transform: translateY(0) scale(0.95);
    }
  }
`;

const Content = styled.div`
  width: 600px;
  min-height: 240px;
  margin: 90px;
  padding: 16px 50px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 999;

  transition: transform 0.25s;
`;

const Modal = ({ id, className, style, children, preventClose, onToggle }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectVisible(id));
  const [interactable, setInteractable] = useState(false);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);

  const backgroundClass = {
    hidden: !isVisible,
    locked: !(isVisible || interactable),
  };

  const onClick = useCallback(
    (e) => {
      if (
        !preventClose &&
        contentRef.current &&
        !contentRef.current.contains(e.target)
      ) {
        dispatch(hide(id));
      }
    },
    [contentRef, dispatch, id],
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClick, true);
    return () => {
      document.removeEventListener("mousedown", onClick, true);
    };
  }, [onClick]);

  useEffect(() => {
    onToggle(isVisible);
    if (backgroundRef && isVisible) {
      backgroundRef.current.scrollTo(0, 0);
    }
  }, [backgroundRef, isVisible]);

  return (
    <Background
      ref={backgroundRef}
      className={classNames(backgroundClass)}
      onTransitionEnd={() => setInteractable(isVisible)}
    >
      <Content ref={contentRef} style={style} className={className}>
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
  preventClose: PropTypes.bool,
  onToggle: PropTypes.func,
};

Modal.defaultProps = {
  id: "modal",
  preventClose: false,
  onToggle: () => {},
};

export default Modal;
