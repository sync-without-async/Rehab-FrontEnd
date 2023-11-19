import styled from "styled-components";
import DateSelect from "../Input/DateSelect";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import DropdownFilter from "../Dropdown/DropdownFilter.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import Button from "../Button/Button.jsx";
import { registerChart, getTherapistList } from "../../librarys/api/chart";
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

const Grid = styled.div`
  margin: 48px 70px;
  display: grid;
  grid-template-columns: 240px 240px;
  gap: 28px 100px;
`;

const InputArea = styled(InputAreaContainer)`
  grid-column-end: span 2;
`;

const Btn = styled(Button)`
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
    gender,
    birthday,
    doctor_id,
    therapist_id,
    schedule,
    treatmentRecord,
    exerciseRequest,
    therapistList,
  } = state;

  const navigate = useNavigate();

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
      value: t.name + " (" + t.department + ")",
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
    try {
      const response = await registerChart({ ...state, token });
      console.log(response);
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
          onChange={setData("phone")}
        />
        <DropdownFilter
          label="담당 치료사 *"
          items={therapistList}
          onSelect={setData("therapist_id", "key")}
        />
        <DateSelect
          labelText="다음 외래 일정 *"
          value={schedule}
          onChange={setData("schedule")}
        />
        <div />
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
        <Btn type="primary" onClick={handleSubmit}>
          차트 등록하기
        </Btn>
      </Grid>
    </BlockContainer>
  );
};

export default DoctorChart;
