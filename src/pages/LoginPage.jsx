import LoginComponents from "../components/Accounts/LoginComponents";
import { useState } from "react";
import PageContainer from "../components/Common/PageContainer.jsx";

const LoginPage = () => {
  const [userType, setUserType] = useState(null); // 유저 타입 상태 추가

  // 로그인 성공시 호출되는 함수
  const handleLoginSuccess = (response) => {
    setUserType(response.type);
  };

  return (
    <PageContainer>
      <LoginComponents onLoginSuccess={handleLoginSuccess} />
    </PageContainer>
  );
};

export default LoginPage;
