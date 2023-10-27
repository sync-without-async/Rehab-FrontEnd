import styled from "styled-components";
import PropTypes from "prop-types";

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

  &:focus {
    outline: none;
  }
`;

function InputArea({ value, onInput, className }) {
  return (
    <Item type="text" value={value} onChange={onInput} className={className} />
  );
}

InputArea.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func,
  className: PropTypes.string,
};

export default InputArea;
