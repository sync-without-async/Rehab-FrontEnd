import styled from 'styled-components';
import RoleButton from '../Button/RoleButton';
import Dropdown from '../Dropdown/Dropdown';
import InputText from '../Input/InputText';
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 0px;
`;

const StyledInputImage = styled(InputImage)`
  margin-left: -200px; 
`;

const SignupComponents = () => {
  
  // 소속병원 선택
  const hospitals = [
    "한림대학교 춘천성심병원", "한림대학교 강남성심병원", 
    "한림대학교 동탄성심병원", "한림대학교 성심병원(평촌)", 
    "한림대학교 한강성심병원", "강동성심병원"
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
    </SignupContainer>
  );
};

export default SignupComponents;
