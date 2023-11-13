import classNames from "classnames";
import styled from "styled-components";
import PropTypes from "prop-types";

const Item = styled.a`
  width: 210px;
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  background-color: #f3f3f3;
  color: black;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &.primary {
    background-color: #3592ff;
    color: #fdfdfd;
  }

  &.icon {
    background-color: #ffffff;
    color: #667080;
    font-weight: 500;
    font-size: 14px;
  }

  &.disabled {
    background-color: #888888;
    color: #444444;
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
  }

  &.selected {
    border: 2px solid #ad5dfd;
    background-color: #f3f1ff;
    color: black;
  }
`;

const Button = ({ type, children, onClick, className, style }) => {
  return (
    <Item
      style={style}
      className={classNames(className, type)}
      onClick={onClick}
    >
      {children}
    </Item>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
