import styled from "styled-components";
import Calendar from "../Calender/Calender.jsx";
import Modal from "../Common/Modal.jsx";
import ModalTitleText from "../Common/ModalTitleText.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import ToggleButton from "../Button/ToggleButton.jsx";
import Button from "../Button/Button.jsx";
import CalenderMonth from "../Calender/CalenderMonth.jsx";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useReducer, useState } from "react";
import {
  intialReserveCreateState,
  reserveCreateReducer,
} from "../../reducer/reservation-create.js";
import dayjs from "dayjs";
import { createReservation } from "../../librarys/api/reservation.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Label = styled.p`
  width: 100%;
  &::after {
    content: "*";
    padding-left: 4px;
    color: gray;
    vertical-align: sub;
  }
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const id = "reservation_create";

function createTimes(start = 36, count = 5) {
  const date = dayjs("2023-01-01T00:00:00+09:00");
  const times = [];
  for (let i = start; i < start + count; i++) {
    const deltaTime = date.add(30 * i, "m");
    times.push({
      index: i,
      value: deltaTime.format("HH:mm"),
    });
  }
  return times;
}

export const ReservationCreateModal = () => {
  const [state, dispatch] = useReducer(
    reserveCreateReducer,
    intialReserveCreateState,
  );

  const [times, setTimes] = useState(createTimes());
  const { index, available, description } = state;

  useEffect(() => {
    dispatch({
      type: "available",
      payload: [true, true, true, false, false],
    });
  }, []);

  function onSelect(id) {
    dispatch({
      type: "index",
      payload: id,
    });
  }

  function onInput(event) {
    dispatch({
      type: "description",
      payload: event.target.value,
    });
  }

  async function onComplete() {
    // const res = await createReservation(
    //   state.adminId,
    //   "ldh",
    //   state.description,
    //   [state.year, state.month + 1, state.date].join("-"),
    //   state.index,
    // );
    console.log(state);
  }

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <Modal id={id}>
        <Container>
          <ModalTitleText text="예약 정보 작성" id={id} />
          <Label>날짜 선택</Label>
          <Wrapper>
            <CalenderMonth />
            <Calendar />
          </Wrapper>
          <Wrapper>
            <Label>시간 선택</Label>
            <ButtonContainer>
              {times.map((item, i) => (
                <ToggleButton
                  key={item.index}
                  selected={item.index === index}
                  disabled={!available[i]}
                  onClick={() => onSelect(item.index)}
                >
                  {item.value}
                </ToggleButton>
              ))}
            </ButtonContainer>
          </Wrapper>

          <InputArea
            label="진료 희망 사유"
            value={description}
            onInput={onInput}
          />
          <Button type="primary" onClick={onComplete}>
            예약 신청
          </Button>
        </Container>
      </Modal>
    </ReducerContext.Provider>
  );
};

export default ReservationCreateModal;
