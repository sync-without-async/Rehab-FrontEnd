import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 133px;
  border-radius: 10px;
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding: 12px;
  resize: none; 

  &:focus {
    outline: none;
  }
`;

function InputLongText({ label }) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <TextArea />
    </InputContainer>
  );
}

export { TextArea };
export default InputLongText;
