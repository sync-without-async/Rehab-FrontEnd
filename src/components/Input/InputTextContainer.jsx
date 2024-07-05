import styled from "styled-components";
import PropTypes from "prop-types";
import InputText from "./InputText";

const Input = styled(InputText)`
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

function InputTextContainer({
  label,
  name,
  required,
  disabled,
  password,
  placeholder,
  value,
  onChange,
  onKeyDown,
  ...props
}) {
  return (
    <InputContainer {...props}>
      <Label>{label}</Label>
      <Input
        name={name}
        value={value}
        disabled={disabled}
        password={password}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
      />
    </InputContainer>
  );
}

InputTextContainer.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  password: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

InputTextContainer.defaultProps = {
  disabled: false,
  onKeyDown: () => {},
};

export default InputTextContainer;
