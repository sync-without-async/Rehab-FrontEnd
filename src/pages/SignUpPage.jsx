import styled from "styled-components";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { MdVpnKey, MdEmail } from "react-icons/md";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-top: 200px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 10px 0;
  width: 400px;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  text-align: center;
  outline: none;

  &::placeholder { 
    font-weight: bold;
  }
`;


const SignUpPage = () => {
  return (
    <SignupContainer>
      <Title>회원가입 하기</Title>
      <InputWrapper>
        <InputIcon>
          <BsPerson />
        </InputIcon>
        <StyledInput type="text" placeholder="닉네임" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          <BsPersonFill />
        </InputIcon>
        <StyledInput type="text"  placeholder="ID" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          <MdVpnKey />
        </InputIcon>
        <StyledInput type="password" placeholder="Password" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          <MdEmail />
        </InputIcon>
        <StyledInput type="email" placeholder="Email" />
      </InputWrapper>
    </SignupContainer>
  );
};

export default SignUpPage;
