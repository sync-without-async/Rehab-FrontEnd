import styled from "styled-components";
import { Link } from "react-router-dom";
import { DispatchContext } from "../librarys/context.jsx";
import { useContext } from "react";
import Modal from "./Modal.jsx";
import { BsPersonFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { userLogin } from "../librarys/login-api.js";
import { login } from "../redux/userSlice.js";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-family: "SUIT Variable";
  font-weight: bold;
  position: relative;
  margin-top: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  left: 100px;
  top: 50%;
  transform: translateY(-50%);
  font-family: "SUIT Variable";
`;

const Nav = styled.nav`
  display: flex;
  position: absolute;
  right: 70px;
  align-items: center;
  font-family: "SUIT Variable";
`;

const MainLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: "SUIT Variable";
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    outline: none;
  }
`;

const Divider = styled.div`
  height: 30px;
  width: 1px;
  background-color: black;
  margin-left: 20px;
  margin-right: 30px;
`;

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

const Header = () => {
  const dispatch = useContext(DispatchContext);
  const reduxDispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async () => {
    dispatch({ type: "show", payload: "loginModal" });
  };

  const handleLoginSubmit = async () => {
    const result = await userLogin(id, password);
    if (result) {
      reduxDispatch(login(result));
      dispatch({ type: "hide", payload: "loginModal" });
    } else {
      alert("로그인 실패: 잘못된 ID 또는 비밀번호입니다.");
    }
  };
  return (
    <HeaderWrapper>
      <Logo>
        <MainLink to="/">Re:Hab</MainLink>
      </Logo>
      <Nav>
        <MainLink to="/register" style={{ marginRight: "50px" }}>
          운동등록
        </MainLink>
        <MainLink to="/" style={{ marginRight: "40px" }}>
          메인 페이지
        </MainLink>
        <MainLink to="/mycourse" style={{ marginRight: "20px" }}>
          수강내역
        </MainLink>
        <Divider />
        <MainLink to="#" onClick={handleLoginClick}>
          로그인
        </MainLink>
      </Nav>
      <Modal id="loginModal">
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
    </HeaderWrapper>
  );
};

export default Header;
