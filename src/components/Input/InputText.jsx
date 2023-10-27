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

function InputText({ value, onInput, className }) {
  return (
    <Item type="text" value={value} onChange={onInput} className={className} />
  );
}

InputText.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func,
  className: PropTypes.string,
};

export default InputText;
