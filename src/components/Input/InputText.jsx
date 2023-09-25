import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
`;

const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 320px;
  height: 50px;
  border-radius: 10px;
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

function InputText({ label }) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input type="text" />
    </InputContainer>
  );
}

export default InputText;
