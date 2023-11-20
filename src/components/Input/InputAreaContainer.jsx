import styled from "styled-components";
import PropTypes from "prop-types";
import InputArea from "./InputArea";
import classNames from "classnames";

const Input = styled(InputArea)`
  width: 100% !important;
  height: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
`;

function InputAreaContainer({ label, value, onInput, disabled, ...props }) {
  return (
    <InputContainer {...props}>
      <Label>{label}</Label>
      <Input value={value} onInput={onInput} disabled={disabled} />
    </InputContainer>
  );
}

InputAreaContainer.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onInput: PropTypes.func,
  disabled: PropTypes.bool,
};

export default InputAreaContainer;
