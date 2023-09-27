import styled from 'styled-components';
import RoleButton from '../Button/RoleButton';
import Dropdown from '../Dropdown/Dropdown';
import InputText, { Input } from '../Input/InputText';
import InputImage from '../Input/InputImage';

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

const DropdownsContainer = styled.div`
  margin-top: 30px;
  margin-left: 130px;
`;

const InputFieldsContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  margin-top: 30px; 
  margin-left: 130px;
  gap: 20px; 
  width: 700px;  
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 0px;
  gap: 60px;
`;

const StyledInputImage = styled(InputImage)`
`;

const EmailInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  width: 700px; 
  margin-left: 130px; 
  margin-top: 30px;
`;


const EmailInput = styled(Input)`
  width: 200%;
`;

const VerifyButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: #f0f0f0;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 280px;
  height: 60px;
  background-color: #3592FF;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  border: none;
  cursor: pointer;
  position: absolute;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  margin-top: 40px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const SignupComponents = () => {
  
  // 소속병원 선택
  const hospitals = [
    "춘천성심병원", "강남성심병원", 
    "동탄성심병원", "한림성심병원", 
    "한강성심병원", "강동성심병원"
  ];

  // 재활 분야 선택
  const fields = ["재활의학과", "신경외과", "정형외과"];

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <Divider />
      <ButtonContainer>
        <RoleButton role="doctor" />
        <RoleButton role="therapist" />
      </ButtonContainer>
      <FlexContainer>
        <DropdownsContainer>
          <Dropdown label="소속 병원명 *" items={hospitals} />
          <Dropdown label="재활 분야 *" items={fields} />
        </DropdownsContainer>
        <StyledInputImage />
      </FlexContainer>
      <InputFieldsContainer>
        <InputText label="성함 *" />
        <InputText label="연락처 *" />
      </InputFieldsContainer>
      <EmailInputContainer>
        <InputText label="이메일 *">
          <EmailInput type="text" />
        </InputText>
        <VerifyButton>인증</VerifyButton>
      </EmailInputContainer>
      <InputFieldsContainer>
        <InputText label="아이디 *" />
        <InputText label="비밀번호 *" />
      </InputFieldsContainer>
      <Button>가입하기</Button>
    </SignupContainer>
  );
};

export default SignupComponents;
