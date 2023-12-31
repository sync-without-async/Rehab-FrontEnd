import styled from "styled-components";
import PropTypes from "prop-types";

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
`;

function InputText({ value, onChange, onKeyDown, className, password }) {
  return (
    <Item
      type={password ? "password" : "text"}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={className}
    />
  );
}

InputText.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  password: PropTypes.bool,
};

InputText.defaultProps = {
  password: false,
  onKeyDown: () => {},
};

export default InputText;
