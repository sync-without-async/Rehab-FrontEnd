import styled from "styled-components";
import DateSelect from "../Input/DateSelect";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import DropdownFilter from "../Dropdown/DropdownFilter.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import Button from "../Button/Button.jsx";
import {
  registerChart,
  getTherapistList,
  createChart,
} from "../../librarys/api/chart";
import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../redux/userSlice";
import {
  chartCreateReducer,
  intialChartCreateState,
} from "../../reducer/chart-create.js";
import { getByPath } from "../../librarys/util.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GENDER_LIST } from "../../librarys/type.js";
import { createProgram } from "../../librarys/api/program.js";

const Grid = styled.div`
  margin: 48px 70px;
  display: grid;
  grid-template-columns: 250px 250px;
  gap: 28px 100px;
`;

const InputArea = styled(InputAreaContainer)`
  grid-column-end: span 2;
`;

const RegisterButton = styled(Button)`
  grid-column-end: span 2;
  justify-self: center;
`;

const DoctorChart = () => {
  const [state, dispatch] = useReducer(
    chartCreateReducer,
    intialChartCreateState,
  );
  const {
    diseaseCode,
    name,
    phone,
    birthday,
    therapist,
    schedule,
    treatmentRecord,
    exerciseRequest,
    therapistList,
  } = state;

  const navigate = useNavigate();

  const id = useSelector(selectId);
  const token = useSelector(selectToken);

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

  function updateTherapists(list) {
    const dropdownList = list.map((t) => ({
      key: t.mid,
      value: `${t.name} (${t.department})`,
    }));

    dispatch({
      type: "field",
      payload: {
        key: "therapistList",
        value: dropdownList,
      },
    });
  }

  useEffect(() => {
    getTherapistList(token)
      .then(updateTherapists)
      .catch((error) => {
        console.error("재활치료사 목록 조회 실패", error);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    console.log(state);
    try {
      const { account_id } = await createChart({ ...state, doctor: id, token });
      const response = await createProgram({
        adminId: therapist,
        userId: account_id,
        description: "",
        list: [],
      });

      prompt(
        `${name}님의 차트가 성공적으로 생성되었습니다!\n${name}님의 아이디는 ${account_id}, 비밀번호는 1111 입니다.`,
        account_id,
      );

      navigate("/chart");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BlockContainer>
      <TitleText text="환자 차트 작성" />
      <Grid>
        <InputTextContainer
          label="질병 분류 번호 *"
          value={diseaseCode}
          onChange={setData("diseaseCode", "target.value")}
        />
        <DropdownFilter
          label="환자 성별 *"
          items={GENDER_LIST}
          onSelect={setData("gender", "key")}
        />
        <InputTextContainer
          label="환자 성함 *"
          value={name}
          onChange={setData("name", "target.value")}
        />
        <DateSelect
          labelText="환자 생년월일 *"
          value={birthday}
          onChange={setData("birthday")}
        />
        <InputTextContainer
          label="환자 전화번호 *"
          value={phone}
          onChange={setData("phone", "target.value")}
        />
        <DropdownFilter
          label="담당 치료사 *"
          items={therapistList}
          onSelect={setData("therapist", "key")}
        />
        <DateSelect
          labelText="다음 외래 일정 *"
          value={schedule}
          onChange={setData("schedule")}
        />
        <InputArea
          label="진료 기록 작성 *"
          value={treatmentRecord}
          onChange={setData("treatmentRecord", "target.value")}
        />
        <InputArea
          label="재활치료사 재활 운동 요청서 작성 *"
          value={exerciseRequest}
          onChange={setData("exerciseRequest", "target.value")}
        />
        <RegisterButton type="primary" onClick={handleSubmit}>
          차트 등록하기
        </RegisterButton>
      </Grid>
    </BlockContainer>
  );
};

export default DoctorChart;
