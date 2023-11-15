import styled from "styled-components";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import RoleButton from "../Button/RoleButton.jsx";
import InputImage from "../Input/InputImage.jsx";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import Button from "../Button/Button.jsx";
import DropdownFilter from "../Dropdown/DropdownFilter.jsx";
import { useState } from 'react';
import { userSignup } from '../../librarys/api/signup.js';

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

  //이미지 업로드 api 연결
  const handleImageSelect = (file) => {
    const formDataCopy = { ...formData };
    formDataCopy.file = file;
    setFormData(formDataCopy);
  };

  const [formData, setFormData] = useState({
    mid: '',
    password: '',
    name: '',
    hospital: '',
    department: '',
    email: '',
    phone: '',
    staffRole: '',
    fileName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup(formData);
      console.log(response); 
    } catch (error) {
      console.error(error); 
    }
  };

  const handleInputChange = (id) => {
    return (e) => {
      setFormData({ ...formData, [id]: e.target.value });
    }
  };

  return (
    <BlockContainer>
      <form onSubmit={handleSubmit}>
      <TitleText text="회원가입" />
      <Grid>
        <RoleButton role="doctor" isSelected={selectedRole === 'doctor'} onSelectRole={() => handleSelectRole('doctor')} />
          <RoleButton role="therapist" isSelected={selectedRole === 'therapist'} onSelectRole={() => handleSelectRole('therapist')} />
          <DropdownFilter 
            label="소속 병원명 *" 
            items={hospitalItems}
            onSelect={handleSelectHospital}
          />
          <InputImage onImageSelect={handleImageSelect} style={{ gridRowEnd: "span 2" }} />
          <InputTextContainer label="전공 분야 *" name="department" value={formData.department} onChange={handleInputChange("department")} />
          <InputTextContainer label="성함 *" name="name" value={formData.name} onChange={handleInputChange("name")} />
          <InputTextContainer label="연락처 *" name="phone" value={formData.phone} onChange={handleInputChange("phone")} />
          <InputTextContainer
            label="이메일 *"
            name="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            style={{ gridColumnEnd: "span 2" }}
          />
          <InputTextContainer label="아이디 *" name="mid" value={formData.mid} onChange={handleInputChange("mid")} />
          <InputTextContainer label="비밀번호 *" name="password" value={formData.password} onChange={handleInputChange("password")} />
          <RegisterButton type="submit">회원가입</RegisterButton>
      </Grid>
      </form>
    </BlockContainer>
  );
};

export default Signup;
