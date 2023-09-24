import styled from 'styled-components';
import Header from '../components/Header/Header';
import LoginComponents from "../components/Accounts/LoginComponents";
import { useState } from 'react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100vh;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; 
`;

const LoginPage = () => {
  const [userType, setUserType] = useState(null); // 유저 타입 상태 추가

  // 로그인 성공시 호출되는 함수
  const handleLoginSuccess = (response) => {
      setUserType(response.type);
  };

  return (
      <PageContainer>
          <Header userType={userType} />  {/* userType을 prop으로 전달 */}
          <CenteredContainer>
              <LoginComponents onLoginSuccess={handleLoginSuccess} />
          </CenteredContainer>
      </PageContainer>
  );
}

export default LoginPage;
