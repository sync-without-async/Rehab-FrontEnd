import { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";

import ProfileImage from "../../assets/images/user/default.png";

import { MdCalendarMonth, MdPerson } from "react-icons/md";
import { DATE_FORMAT, ROLE_LIST, ROLE_TYPE } from "../../librarys/type.js";
import dayjs from "dayjs";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { show } from "../../redux/modalSlice.js";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 110px;
  padding: 0 24px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const Image = styled.img`
  width: 72px;
  height: 72px;
  background-color: #d9d9d9;
  border-radius: 36px;
  object-fit: contain;
  overflow: hidden;
`;

const Info = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  font-size: 16px;
  font-weight: 400;
`;

const Big = styled.span`
  margin-right: 8px;
  font-size: 22px;
  font-weight: 800;
`;

const Item = styled.div`
  width: ${(props) => props.width || "auto"};
  vertical-align: middle;

  &.user {
    display: none;
  }

  & > svg {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    vertical-align: middle;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Btn = styled(Button)`
  width: 160px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
`;

/* 
1. Close  !isOpen && !isDone     아직 열리지 않은 예약
2. Open    isOpen && !isDone     열려서 들어갈 수 있는 예약
3. Done    isOpen &&  isDone     완료된 예약
*/

const buttonStyleList = {
  normal: { type: "primary", text: "입장" },
  complete: { type: "disabled", text: "종료되었습니다" },
  notReady: { type: "disabled", text: "예약 시간이 아닙니다" },
};

const ReservationItem = ({
  id,
  uuid,
  name,
  role,
  date,
  index,
  patient,
  image,
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
  const isUser = useMemo(() => classNames({ user: role === "USER" }), [role]);

  const isRoomOpen = time >= -10;
  const isReservationDone = time > 300;

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

    navigate("/meeting/room/" + uuid);
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
      <Image src={image || ProfileImage} />
      <Info>
        <Item>
          <Big>{name}</Big>님
        </Item>
        <Item width="100px" className={isUser}>
          <MdPerson />
          {role}
        </Item>
        <Item>
          <MdCalendarMonth />
          {fullDate.format(DATE_FORMAT)}
        </Item>
      </Info>
      <ButtonContainer>
        <Btn type={buttonStyle.type} onClick={onJoinButtonClick}>
          {buttonStyle.text}
        </Btn>
        <Btn type="info" onClick={onInfoButtonClick}>
          상세 정보
        </Btn>
      </ButtonContainer>
    </Container>
  );
};

ReservationItem.propTypes = {
  id: PropTypes.string,
  uuid: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
  image: PropTypes.string,
  patient: PropTypes.string,
  description: PropTypes.string,
  summary: PropTypes.string,
};

ReservationItem.defaultProps = {
  role: "USER",
  image: ProfileImage,
  patient: null,
};

export default ReservationItem;
