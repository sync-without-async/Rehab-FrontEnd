import classNames from "classnames";
import styled from "styled-components";
import PropTypes from "prop-types";

const Item = styled.button`
  width: 210px;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: #f3f3f3;
  color: black;
  border: 1px solid #bbbbbb;

  &.primary {
    background-color: #3592ff;
    color: #fdfdfd;
  }

  &.disabled {
    background-color: #888888;
    color: #444444;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.selected {
    border: 2px solid #ad5dfd;
    background-color: #f3f1ff;
    color: black;
  }
`;

const Button = ({ type, text, onClick, className }) => {
  return (
    <Item className={classNames(className, type)} onClick={onClick}>
      {text}
    </Item>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
