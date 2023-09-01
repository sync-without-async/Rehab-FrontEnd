import { styled } from "styled-components";
import Modal from "./Modal.jsx";

import { saveToken, userLogin } from "../librarys/login-api.js";

import { useDispatch } from "react-redux";
import { hide } from "../redux/modalSlice.js";

import { BsPersonFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { useState } from "react";
import { login } from "../redux/userSlice.js";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 10px 0;
  width: 100%;
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

const modalId = "login";

const LoginModal = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async () => {
    try {
      const result = await userLogin(id, password);
      const data = saveToken(result.data);

      dispatch(login(data));
      dispatch(hide(modalId));
    } catch (e) {
      if (e.isAxiosError && e.response.status === 401) {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
        console.error(e);
      }
    }
  };

  return (
    <Modal id={modalId}>
      <LoginContainer>
        <Title>로그인 하기</Title>
        <InputWrapper>
          <InputIcon>
            <BsPersonFill />
          </InputIcon>
          <StyledInput
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon>
            <MdVpnKey />
          </InputIcon>
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <button onClick={handleLoginSubmit}>로그인</button>
      </LoginContainer>
    </Modal>
  );
};

export default LoginModal;
