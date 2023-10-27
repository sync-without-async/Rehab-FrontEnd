import styled from "styled-components";
import PropTypes from "prop-types";
import InputArea from "./InputArea";

const Input = styled(InputArea)`
  width: 100% !important;
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

function InputAreaContainer({ label, value, onInput, ...props }) {
  return (
    <InputContainer {...props}>
      <Label>{label}</Label>
      <Input value={value} onInput={onInput} />
    </InputContainer>
  );
}

InputAreaContainer.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onInput: PropTypes.func,
};

export default InputAreaContainer;
