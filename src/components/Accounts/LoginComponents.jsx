import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import TitleText from "../Common/TitleText";
import BlockContainer from "../Common/BlockContainer";
import InputTextContainer from "../Input/InputTextContainer";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { getMyInfo, login, selectName } from "../../redux/userSlice.js";
import { useSelector } from "react-redux";

const InputContainer = styled.div`
  margin: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Input = styled(InputTextContainer)`
  width: 320px;
`;

const FooterContainer = styled.div`
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Link = styled.span`
  color: #7e7e7e;
  font-size: 14px;
  cursor: pointer;
`;

const LoginComponents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const tokenResponse = await dispatch(login({ id, password }));

    if (tokenResponse.error) {
      alert("아이디나 비밀번호를 다시 한번 확인해주세요.");
      return;
    }

    const infoResponse = await dispatch(getMyInfo(tokenResponse.payload));

    console.log(infoResponse);

    alert(`${infoResponse.payload.name}님, 환영합니다.`);

    if (redirect) {
      navigate(redirect);
    } else {
      navigate("/");
    }
  };

  return (
    <BlockContainer>
      <TitleText text="로그인" />
      <InputContainer>
        <Input
          label="아이디"
          value={id}
          onInput={(e) => setId(e.target.value)}
        />
        <Input
          label="비밀번호"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
      </InputContainer>

      <FooterContainer>
        <Button type="primary" onClick={handleLogin}>
          로그인
        </Button>
        <Link onClick={() => navigate("/register")}>
          아직 계정이 없으신가요?
        </Link>
      </FooterContainer>
    </BlockContainer>
  );
};

export default LoginComponents;
