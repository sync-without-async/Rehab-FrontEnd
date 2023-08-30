import styled from "styled-components";
import {  BsPersonFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";

const LoginContainer = styled.div`
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


const LoginPage = () => {
  return (
    <LoginContainer>
      <Title>로그인 하기</Title>
      <InputWrapper>
        <InputIcon>
          <BsPersonFill />
        </InputIcon>
        <StyledInput type="text" placeholder="ID" />
      </InputWrapper>
      <InputWrapper>
        <InputIcon>
          <MdVpnKey />
        </InputIcon>
        <StyledInput type="password" placeholder="Password" />
      </InputWrapper>
    </LoginContainer>
  );
};

export default LoginPage;