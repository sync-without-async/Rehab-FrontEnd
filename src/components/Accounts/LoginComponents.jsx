import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TitleText from "../Common/TitleText";
import BlockContainer from "../Common/BlockContainer";
import InputTextContainer from "../Input/InputTextContainer";
import Button from "../Button/Button";
import { userLogin } from "../../librarys/api/login";

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

const LoginComponents = ({}) => {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await userLogin(id, password);
    if (response) {
      console.log("로그인 성공:", response);
      alert("로그인 완료");
      // navigate("/dashboard"); // 이거 아직 페이지 완성 안됨 임시 로그인 되나만 확인용입니다.
    } else {
      alert("아이디나 비밀번호가 일치하지 않습니다.");
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
        <Link onClick={() => navigate("/signup")}>아직 계정이 없으신가요?</Link>
      </FooterContainer>
    </BlockContainer>
  );
};

export default LoginComponents;
