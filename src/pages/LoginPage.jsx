import styled from 'styled-components';
import GuestHeader from '../components/Header/GuestHeader';
import LoginComponents from "../components/Accounts/LoginComponents";

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
    return (
        <PageContainer>
            <GuestHeader />
            <CenteredContainer>
                <LoginComponents />
            </CenteredContainer>
        </PageContainer>
    );
}

export default LoginPage;
