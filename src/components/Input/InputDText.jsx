import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 720px;
  height: 100px;
  border-radius: 10px;
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding-left: 0px;

  &:focus {
    outline: none;
  }
`;

function InputDText({ label }) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input type="text" />
    </InputContainer>
  );
}

export { Input };
export default InputDText;
