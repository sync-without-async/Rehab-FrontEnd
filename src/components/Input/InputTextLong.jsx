import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-bottom:20px;
`;

const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 550px;
  height: 133px;
  border-radius: 10px;
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding-left: 0px;

  &:focus {
    outline: none;
  }
`;

function InputLongText({ label }) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input type="text" />
    </InputContainer>
  );
}

export { Input };
export default InputLongText;