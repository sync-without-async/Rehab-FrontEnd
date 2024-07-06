import styled from "styled-components";
import PropTypes from "prop-types";
import InputArea from "./InputArea";
import classNames from "classnames";

const Input = styled(InputArea)`
  width: 100% !important;
  flex-grow: 1;
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

function InputAreaContainer({ label, value, onChange, disabled, ...props }) {
  return (
    <InputContainer {...props}>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} disabled={disabled} />
    </InputContainer>
  );
}

InputAreaContainer.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default InputAreaContainer;
