import styled from "styled-components";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import RoleButton from "../Button/RoleButton.jsx";
import InputImage from "../Input/InputImage.jsx";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import Button from "../Button/Button.jsx";
import DropdownFilter from "../Dropdown/DropdownFilter.jsx";

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
  return (
    <BlockContainer>
      <TitleText text="회원가입" />
      <Grid>
        <RoleButton role="doctor" />
        <RoleButton role="therapist" />
        <DropdownFilter label="소속 병원명 *" items={[]} />
        <InputImage style={{ gridRowEnd: "span 2" }} />
        <DropdownFilter label="재활 분야 *" items={[]} />
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
