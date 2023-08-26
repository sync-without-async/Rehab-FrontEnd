import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdClose, MdPlayArrow, MdRefresh } from "react-icons/md";
import classNames from "classnames";

import styled from "styled-components";
import { DispatchContext } from "../../librarys/context";

const Container = styled.div`
  left: 50%;
  bottom: 36px;
  padding: 8px 16px;
  border-radius: 36px;

  position: absolute;

  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  padding: 4px 12px;
  border-radius: 24px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  color: white;
  cursor: pointer;

  transition:
    opacity 0.2s,
    background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.disable {
    opacity: 0.33;
    cursor: auto;
    pointer-events: none;
  }
`;

const Text = styled.p``;

const Button = ({ icon, text, disable, onClick }) => {
  return (
    <ButtonContainer className={classNames({ disable })} onClick={onClick}>
      {icon}
      <Text>{text}</Text>
    </ButtonContainer>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disable: false,
  onClick: null,
};

const ControllerSection = () => {
  const dispatch = useContext(DispatchContext);
  return (
    <IconContext.Provider value={{ size: "24px" }}>
      <Container>
        <Button icon={<MdClose />} text="운동 종료하기" />
        <Button icon={<MdPlayArrow />} text="시작하기" />
        <Button icon={<MdRefresh />} text="가이드 영상 다시보기" />
      </Container>
    </IconContext.Provider>
  );
};

export default ControllerSection;
