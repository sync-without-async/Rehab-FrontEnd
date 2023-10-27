import classNames from "classnames";
import styled from "styled-components";
import PropTypes from "prop-types";

const Item = styled.a`
  width: 90px;
  height: 40px;
  padding: 0 9px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  background-color: #fafafa;
  color: black;
  border: 1px solid #e8e8e8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

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

const ToggleButton = ({ selected, disabled, children, onClick, className }) => {
  return (
    <Item
      className={classNames(className, { selected, disabled })}
      onClick={onClick}
    >
      {children}
    </Item>
  );
};

ToggleButton.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ToggleButton;
