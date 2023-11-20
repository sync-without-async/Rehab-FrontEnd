import styled from "styled-components";
import PropTypes from "prop-types";
import InputText from "./InputText";

const Input = styled(InputText)`
  width: 100%;
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

function InputTextContainer({
  label,
  name,
  required,
  password,
  value,
  onChange,
  ...props
}) {
  return (
    <InputContainer {...props}>
      <Label>{label}</Label>
      <Input
        name={name}
        value={value}
        password={password}
        onChange={onChange}
        required={required}
      />
    </InputContainer>
  );
}

InputTextContainer.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  password: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputTextContainer;
