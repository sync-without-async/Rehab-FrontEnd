import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";

const Item = styled.textarea`
  width: 240px;
  height: 107px;
  padding: 12px;
  font-size: 14px;
  border-radius: 10px;
  background-color: #fafafa;
  border: 1px solid #bbbbbb;
  padding-left: 12px;
  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &.disabled {
    background-color: #cccccc;
    color: #666666;
  }
`;

function InputArea({ value, onInput, disabled, className }) {
  const displayClassName = classNames(className, { disabled });

  return (
    <Item
      type="text"
      value={value}
      onChange={onInput}
      disabled={disabled}
      className={displayClassName}
      rows={3}
    />
  );
}

InputArea.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

InputArea.defaultProps = {
  disabled: false,
};

export default InputArea;
