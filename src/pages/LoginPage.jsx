import styled from 'styled-components';
import LoginComponents from "../components/Accounts/LoginComponents";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;

const LoginPage = () => {
    return (
        <CenteredContainer>
            <LoginComponents />
        </CenteredContainer>
    );
}

export default LoginPage;
