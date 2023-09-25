import styled from 'styled-components';
import RoleButton from '../Button/RoleButton';

const SignupContainer = styled.div`
  width: 1000px;
  height: 1000px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 2px solid #0064FF;
  position: relative;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1);
`;

const Divider = styled.div`
  width: 900px;
  height: 1px;
  background-color: #D9D9D9;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 35px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 700;
  margin-left: 30px;
  margin-top: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;  
  margin-top: 80px;
  margin-left: 130px;
`;

const SignupComponents = () => {
  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <Divider />
      <ButtonContainer>
        <RoleButton role="doctor" />
        <RoleButton role="therapist" />
      </ButtonContainer>
    </SignupContainer>
  );
};

export default SignupComponents;
