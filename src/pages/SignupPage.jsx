import styled from "styled-components";
import SignupComponents from "../components/Accounts/SignupComponents";

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
  margin-top: -50px;
`;

const SignupPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <SignupComponents />
      </CenteredContainer>
    </PageContainer>
  );
};

export default SignupPage;
