import { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";

import { MdCalendarMonth } from "react-icons/md";
import { DATE_FORMAT } from "../../librarys/type.js";
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

const CustomButton = styled(Button)`
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

const buttonStyleList = {
  normal: { type: "primary", text: "입장" },
  complete: { type: "disabled", text: "종료되었습니다" },
  notReady: { type: "disabled", text: "예약 시간이 아님" },
};

const ReservationMiniItem = ({
  id,
  uuid,
  name,
  role,
  date,
  index,
  patient,
  deleted,
  description,
  summary,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullDate = useMemo(
    () => dayjs(date).add(index * 30, "minute"),
    [date, index],
  );

  const removable = fullDate.valueOf() > dayjs().valueOf();

  const time = useMemo(() => dayjs().diff(fullDate, "minute"), [fullDate]);
  const isRoomOpen = time >= -10;
  const isReservationDone = time > 300;

  const buttonStyle = useMemo(() => {
    if (deleted) {
      return buttonStyleList.complete;
    } else if (isReservationDone) {
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

    navigate(`/meeting/room/${uuid}?rvno=${id}`);
  }

  function onInfoButtonClick() {
    dispatch(
      show({
        id: "reservation_detail",
        props: {
          patientId: patient,
          reservationId: id,
          chartDetail: null,
          removable,
          description,
          summary,
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
        {fullDate.format(DATE_FORMAT)}
      </Row>
      <Row>
        <CustomButton type={buttonStyle.type} onClick={onJoinButtonClick}>
          {buttonStyle.text}
        </CustomButton>
        <CustomButton type="info" onClick={onInfoButtonClick}>
          상세 정보
        </CustomButton>
      </Row>
    </Container>
  );
};

ReservationMiniItem.propTypes = {
  id: PropTypes.string,
  uuid: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
  patient: PropTypes.string,
  description: PropTypes.string,
  deleted: PropTypes.bool,
  summary: PropTypes.string,
};

ReservationMiniItem.defaultProps = {
  role: "DOCTOR",
  patient: null,
};

export default ReservationMiniItem;
