import { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";

import { MdCalendarMonth } from "react-icons/md";
import { DAYJS_FORMAT } from "../../librarys/type.js";
import dayjs from "dayjs";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { show } from "../../redux/modalSlice.js";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 320px;
  height: 120px;
  padding: 12px 24px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
`;

const Icon = styled(MdCalendarMonth)`
  margin-right: 8px;
`;

const Big = styled.span`
  margin-right: 4px;
  font-size: 22px;
  font-weight: 800;
`;

const Btn = styled(Button)`
  width: 120px;
  height: 28px;
  padding: 0px 8px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 32px;
`;

/* 
1. Close  !isOpen && !isDone     아직 열리지 않은 예약
2. Open    isOpen && !isDone     열려서 들어갈 수 있는 예약
3. Done    isOpen &&  isDone     완료된 예약
*/

const dummyText = `그러나 한 시와 강아지, 가을 보고, 새워 까닭입니다. 까닭이요, 이름을 옥 별들을 많은 까닭입니다. 그리워 동경과 둘 이런 이런 계절이 거외다. 나의 오면 언덕 하나 무덤 이런 아직 있습니다. 자랑처럼 하나 무성할 패, 까닭입니다. 하나의 별 사람들의 너무나 별 피어나듯이 당신은 북간도에 봅니다.그러나 한 시와 강아지, 가을 보고, 새워 까닭입니다. 까닭이요, 이름을 옥 별들을 많은 까닭입니다. 그리워 동경과 둘 이런 이런 계절이 거외다. 나의 오면 언덕 하나 무덤 이런 아직 있습니다. 자랑처럼 하나 무성할 패, 까닭입니다. 하나의 별 사람들의 너무나 별 피어나듯이 당신은 북간도에 봅니다.`;
const notReadyText = `아직 비대면 진료 요약이 생성되지 않았습니다.`;

const buttonStyleList = {
  normal: { type: "primary", text: "입장" },
  complete: { type: "disabled", text: "종료되었습니다" },
  notReady: { type: "disabled", text: "예약 시간이 아님" },
};

const ReservationMiniItem = ({ id, name, date, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullDate = useMemo(
    () => dayjs(date).add(index * 30, "minute"),
    [date, index],
  );

  const time = useMemo(() => dayjs().diff(fullDate, "minute"), [fullDate]);
  const isRoomOpen = time >= -10;
  const isReservationDone = time > 30;

  const buttonStyle = useMemo(() => {
    if (isReservationDone) {
      return buttonStyleList.complete;
    } else if (isRoomOpen) {
      return buttonStyleList.normal;
    } else {
      return buttonStyleList.notReady;
    }
  }, [isRoomOpen, isReservationDone]);

  function onJoinButtonClick() {
    if (isReservationDone || !isRoomOpen) {
      return;
    }

    navigate("/untact/meeting/" + id);
  }

  function onInfoButtonClick() {
    dispatch(
      show({
        id: "reservation_detail",
        props: {
          chartDetail: null,
          description: dummyText,
          aiSummary: notReadyText,
        },
      }),
    );
  }

  return (
    <Container>
      <Row>
        <Big>{name}</Big>님
      </Row>
      <Row>
        <Icon />
        {fullDate.format(DAYJS_FORMAT)}
      </Row>
      <Row>
        <Btn type={buttonStyle.type} onClick={onJoinButtonClick}>
          {buttonStyle.text}
        </Btn>
        <Btn type="info" onClick={onInfoButtonClick}>
          상세 정보
        </Btn>
      </Row>
    </Container>
  );
};

ReservationMiniItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
};

export default ReservationMiniItem;
