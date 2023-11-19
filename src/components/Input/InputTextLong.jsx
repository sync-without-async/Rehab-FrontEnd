import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 133px;
  border-radius: 10px;
  background-color: #fafafa;
  border: 1px solid #bbbbbb;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  padding: 12px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

function InputLongText({ label, name, value, onChange }) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <TextArea name={name} value={value} onChange={onChange} />
    </InputContainer>
  );
}

export { TextArea };
export default InputLongText;
