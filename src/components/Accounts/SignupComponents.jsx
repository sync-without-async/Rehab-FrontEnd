import styled from "styled-components";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import RoleButton from "../Button/RoleButton.jsx";
import InputImage from "../Input/InputImage.jsx";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import Button from "../Button/Button.jsx";
import DropdownFilter from "../Dropdown/DropdownFilter.jsx";
import { useState } from 'react';

const Grid = styled.div`
  margin: 48px 70px;
  display: grid;
  grid-template-columns: 240px 240px;
  gap: 28px 100px;
`;

const RegisterButton = styled(Button)`
  margin-top: 4px;
  grid-column-end: span 2;
  justify-self: center;
`;

const Signup = () => {

  // 소속 병원 드롭다운 내용
  const hospitalItems = [
    { key: 'chuncheon', value: '춘천성심병원' },
    { key: 'dongtan', value: '동탄성심병원' },
    { key: 'gangnam', value: '강남성심병원' },
    { key: 'hangang', value: '한강성심병원' },
    { key: 'gangdong', value: '강동성심병원' },
    { key: 'hallym', value: '한림성심병원' },
  ];

  const handleSelectHospital = (hospital) => {
    console.log("Selected Hospital: ", hospital);
  };

  // 역할 버튼 상태 로직
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };


  return (
    <BlockContainer>
      <TitleText text="회원가입" />
      <Grid>
        <RoleButton role="doctor" isSelected={selectedRole === 'doctor'} onSelectRole={() => handleSelectRole('doctor')} />
        <RoleButton role="therapist" isSelected={selectedRole === 'therapist'} onSelectRole={() => handleSelectRole('therapist')} />
        <DropdownFilter 
          label="소속 병원명 *" 
          items={hospitalItems}
          onSelect={handleSelectHospital}
        />
        <InputImage style={{ gridRowEnd: "span 2" }} />
        <InputTextContainer label="전공 분야 *" />
        <InputTextContainer label="성함 *" />
        <InputTextContainer label="연락처 *" />
        <InputTextContainer
          label="이메일 *"
          style={{ gridColumnEnd: "span 2" }}
        />
        <InputTextContainer label="인증번호 *" />
        <InputTextContainer label="비밀번호 *" />
        <RegisterButton type="primary">회원가입</RegisterButton>
      </Grid>
    </BlockContainer>
  );
};

export default Signup;
