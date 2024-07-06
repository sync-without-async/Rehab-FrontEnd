import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";

const Item = styled.input`
  width: 240px;
  height: 40px;
  font-size: 14px;
  border-radius: 10px;
  background-color: #fafafa;
  border: 1px solid #bbbbbb;
  padding-left: 12px;

  &:focus {
    outline: none;
  }

  &.disabled {
    background-color: #cccccc;
    color: #666666;

    &::placeholder {
      color: #8f8f8f;
    }
  }

  &::placeholder {
    color: #c8c8c8;
  }
`;

function InputText({
  value,
  onChange,
  onKeyDown,
  className,
  disabled,
  password,
  placeholder,
}) {
  const displayClassName = classNames(className, { disabled });

  return (
    <Item
      type={password ? "password" : "text"}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={displayClassName}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

InputText.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  password: PropTypes.bool,
  placeholder: PropTypes.string,
};

InputText.defaultProps = {
  password: false,
  disabled: false,
  onKeyDown: () => {},
};

export default InputText;
