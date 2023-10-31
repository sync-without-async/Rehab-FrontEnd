import styled from "styled-components";
import SignupComponents from "../components/Accounts/SignupComponents";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignupPage = () => {
  return (
    <PageContainer>
      <SignupComponents />
    </PageContainer>
  );
};

export default SignupPage;
