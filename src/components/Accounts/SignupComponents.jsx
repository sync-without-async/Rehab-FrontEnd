import styled from "styled-components";
import RoleButton from "../Button/RoleButton";
import Dropdown from "../Dropdown/Dropdown";
import InputText from "../Input/InputText";
import InputImage from "../Input/InputImage";

const SignupContainer = styled.div`
  width: 750px;
  height: 750px;
  border-radius: 7.5px;
  background-color: #ffffff;
  border: 1.5px solid #0064ff;
  position: relative;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.1);
`;

const Divider = styled.div`
  width: 675px;
  height: 0.75px;
  background-color: #d9d9d9;
  margin-top: 7.5px;
  margin-left: 22.5px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 26.25px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
  margin-left: 22.5px;
  margin-top: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 580px;
  margin-top: 60px;
  margin-left: 97.5px;
  gap: 40px;
`;

const DropdownsContainer = styled.div`
  margin-top: 22.5px;
  margin-left: 97.5px;
`;

const InputFieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 22.5px;
  margin-left: 97.5px;
  gap: 15px;
  width: 525px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 0px;
  gap: 70px;
  font-size: 16px;
`;

const StyledInputImage = styled(InputImage)``;

const EmailInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.75px;
  width: 525px;
  margin-left: 97.5px;
  margin-top: 22.5px;
`;

const EmailInput = styled(InputText)`
  width: 150%;
`;

const VerifyButton = styled.button`
  width: 97.5px;
  height: 37.5px;
  background-color: #f0f0f0;
  border: 0.75px solid #bbbbbb;
  border-radius: 7.5px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
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
  width: 210px;
  height: 45px;
  background-color: #3592ff;
  border-radius: 7.5px;
  color: white;
  font-size: 16.5px;
  border: none;
  cursor: pointer;
  position: absolute;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const SignupComponents = () => {
  // 소속병원 선택
  const hospitals = [
    "춘천성심병원",
    "강남성심병원",
    "동탄성심병원",
    "한림성심병원",
    "한강성심병원",
    "강동성심병원",
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
