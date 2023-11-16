import styled from "styled-components";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import RoleButton from "../Button/RoleButton.jsx";
import InputImage from "../Input/InputImage.jsx";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import Button from "../Button/Button.jsx";
import DropdownFilter from "../Dropdown/DropdownFilter.jsx";
import { useReducer, useState } from "react";
import {
  intialUserRegisterState,
  userRegisterReducer,
} from "../../reducer/user-register.js";
import { getByPath } from "../../librarys/util.js";
import { createAccount } from "../../librarys/api/user.js";
import { useDispatch } from "react-redux";
import { getMyInfo, login } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

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

// 소속 병원 드롭다운 내용
const hospitals = [
  "춘천성심병원",
  "동탄성심병원",
  "강남성심병원",
  "한강성심병원",
  "강동성심병원",
  "한림성심병원",
].map((item) => ({ key: item, value: item }));

const Signup = () => {
  const [state, dispatch] = useReducer(
    userRegisterReducer,
    intialUserRegisterState,
  );
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const { id, password, name, hospital, department, email, phone, role } =
    state;

  function setData(key, path) {
    return (value) => {
      if (path) {
        value = getByPath(value, path);
      }

      dispatch({
        type: "field",
        payload: {
          key,
          value,
        },
      });
    };
  }

  async function clickRegisterButton() {
    if (id === "" || id.length < 3) {
      alert("아이디는 4글자 이상으로 입력해주세요.");
      return;
    }
    if (password === "" || password.length < 3) {
      alert("비밀번호는 4글자 이상으로 입력해주세요.");
      return;
    }
    if (name === "") {
      alert("이름을 입력하세요.");
      return;
    }
    if (hospital === "") {
      alert("소속 병원을 입력하세요.");
      return;
    }
    if (department === "") {
      alert("소속 부서를 입력하세요.");
      return;
    }
    if (email === "") {
      alert("이메일을 입력하세요.");
      return;
    }
    if (phone === "") {
      alert("핸드폰 번호를 입력하세요.");
      return;
    }
    console.log(state);

    try {
      await createAccount(state);
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
      return;
    }

    alert(name + "님의 회원가입이 완료되었습니다!");
    const tokenResponse = await reduxDispatch(login({ id, password }));
    await reduxDispatch(getMyInfo(tokenResponse.payload));

    navigate("/");
  }

  return (
    <BlockContainer>
      <TitleText text="회원가입" />
      <Grid>
        <RoleButton
          role="doctor"
          isSelected={role === "ROLE_DOCTOR"}
          onSelectRole={() => setData("role")("ROLE_DOCTOR")}
        />
        <RoleButton
          role="therapist"
          isSelected={role === "ROLE_THERAPIST"}
          onSelectRole={() => setData("role")("ROLE_THERAPIST")}
        />
        <DropdownFilter
          label="소속 병원명 *"
          items={hospitals}
          onSelect={setData("hospital", "value")}
        />
        <InputImage
          onUpload={setData("image")}
          style={{ gridRowEnd: "span 2" }}
        />
        <InputTextContainer
          label="전공 분야 *"
          name="department"
          value={department}
          onChange={setData("department", "target.value")}
        />
        <InputTextContainer
          label="성함 *"
          name="name"
          value={name}
          onChange={setData("name", "target.value")}
        />
        <InputTextContainer
          label="연락처 *"
          name="phone"
          value={phone}
          onChange={setData("phone", "target.value")}
        />
        <InputTextContainer
          label="이메일 *"
          name="email"
          value={email}
          onChange={setData("email", "target.value")}
          style={{ gridColumnEnd: "span 2" }}
        />
        <InputTextContainer
          label="아이디 *"
          name="mid"
          value={id}
          onChange={setData("id", "target.value")}
        />
        <InputTextContainer
          label="비밀번호 *"
          name="password"
          value={password}
          onChange={setData("password", "target.value")}
        />
        <RegisterButton onClick={clickRegisterButton}>회원가입</RegisterButton>
      </Grid>
    </BlockContainer>
  );
};

export default Signup;
