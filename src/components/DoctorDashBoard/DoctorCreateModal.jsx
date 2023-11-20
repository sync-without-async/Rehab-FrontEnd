import styled from "styled-components";
import Modal from "../Common/Modal.jsx";
import ModalTitleText from "../Common/ModalTitleText.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import Button from "../Button/Button.jsx";
import { ReducerContext } from "../../reducer/context.js";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../redux/userSlice.js";
import DateSelect from "../Input/DateSelect.jsx";
import { createRecord } from "../../librarys/api/chart.js";
import { useDispatch } from "react-redux";
import { hide } from "../../redux/modalSlice.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const InputArea = styled(InputAreaContainer)`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const id = "chart_record_create";

export const DoctorCreateModal = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useContext(ReducerContext);
  const token = useSelector(selectToken);
  const [schedule, setSchedule] = useState(null);
  const [treatmentRecord, setTreatmentRecord] = useState("");
  const [exerciseRequest, setExerciseRequest] = useState("");
  const { cno } = state;

  async function onClickSubmit() {
    if (schedule === null) {
      alert("다음 일정을 선택하세요.");
      return;
    }
    if (treatmentRecord.length < 4) {
      alert("진료 기록을 4자 이상 작성하세요.");
      return;
    }
    if (exerciseRequest.length < 4) {
      alert("재활 운동 요청서를 4자 이상 작성하세요.");
      return;
    }

    const response = await createRecord({
      token,
      schedule,
      treatmentRecord,
      exerciseRequest,
      id: cno,
    });

    reduxDispatch(hide(id));
  }

  return (
    <Modal id={id}>
      <Container>
        <ModalTitleText text="진료 기록 추가" id={id} />
        <InputArea
          label="진료 기록 작성 *"
          value={treatmentRecord}
          onInput={(e) => setTreatmentRecord(e.target.value)}
        />
        <InputArea
          label="재활치료사 재활 운동 요청서 작성 *"
          value={exerciseRequest}
          onInput={(e) => setExerciseRequest(e.target.value)}
        />
        <Wrapper>
          <DateSelect
            labelText="다음 외래 일정 *"
            value={schedule}
            onChange={(value) => setSchedule(value)}
          />
        </Wrapper>
        <Button type="primary" onClick={onClickSubmit}>
          기록 추가
        </Button>
      </Container>
    </Modal>
  );
};

export default DoctorCreateModal;
