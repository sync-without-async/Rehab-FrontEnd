import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-top:10px;
`;


const Input = styled.input`
  width: 500px;
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

function InputTextLong() {
  return (
    <InputContainer>
      <Input type="text" />
    </InputContainer>
  );
}

export { Input };
export default InputTextLong;