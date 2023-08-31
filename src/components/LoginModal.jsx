import { styled } from "styled-components";
import Modal from "./Modal.jsx";
import axios from "axios"; 

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

const accounts = [
  {
    id: "admin@example.com",
    password: "qwerty123",
    name: "관리자",
    admin: true,
  },
  {
    id: "user@example.com",
    password: "qwerty123",
    name: "일반유저",
    admin: false,
  },
];

const BASE_URL = 'http://raspberrypihome.iptime.org:8080';

const userLogin = async (id, password) => {
  const account = accounts.find((acc) => acc.id === id && acc.password === password);
  if (!account) {
    return { error: 'Invalid account' };
  }

  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      mid: id,
      password,
    });

    if (response.data && response.data.accessToken && response.data.refreshToken) {
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } else {
      return { error: '로그인에 실패하였습니다.' };
    }
  } catch (error) {
    return { error: error.message || '로그인에 실패하였습니다.' };
  }
};

const LoginModal = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async () => {
    const result = await userLogin(id, password);
    if (result.error) {
      alert(`로그인 실패: ${result.error}`);
    } else {
      dispatch(login(result)); 
      dispatch(hide(modalId));
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
