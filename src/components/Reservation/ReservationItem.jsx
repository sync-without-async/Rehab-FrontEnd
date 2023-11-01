import { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";

import PatientIcon from "../../assets/images/role/role_patient.png";
import DoctorIcon from "../../assets/images/role/role_doctor.png";
import TherapistIcon from "../../assets/images/role/role_therapist.png";

import { MdLocalHospital, MdCalendarMonth, MdPerson } from "react-icons/md";
import { DAYJS_FORMAT, ROLE_TYPE } from "../../librarys/type.js";
import dayjs from "dayjs";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { show } from "../../redux/modalSlice.js";

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

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
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

const dummyText = `그러나 한 시와 강아지, 가을 보고, 새워 까닭입니다. 까닭이요, 이름을 옥 별들을 많은 까닭입니다. 그리워 동경과 둘 이런 이런 계절이 거외다. 나의 오면 언덕 하나 무덤 이런 아직 있습니다. 자랑처럼 하나 무성할 패, 까닭입니다. 하나의 별 사람들의 너무나 별 피어나듯이 당신은 북간도에 봅니다.그러나 한 시와 강아지, 가을 보고, 새워 까닭입니다. 까닭이요, 이름을 옥 별들을 많은 까닭입니다. 그리워 동경과 둘 이런 이런 계절이 거외다. 나의 오면 언덕 하나 무덤 이런 아직 있습니다. 자랑처럼 하나 무성할 패, 까닭입니다. 하나의 별 사람들의 너무나 별 피어나듯이 당신은 북간도에 봅니다.`;

const notReadyText = `아직 비대면 진료 요약이 생성되지 않았습니다.`;

const ReservationItem = ({ name, role, dept, date, index }) => {
  const dispatch = useDispatch();

  const image = useMemo(() => {
    switch (role) {
      case "ADMIN_DOCTOR":
        return DoctorIcon;
      case "ADMIN_THERAPIST":
        return TherapistIcon;
      default:
        return PatientIcon;
    }
  }, [role]);

  const roleDisplay = useMemo(() => {
    const find = ROLE_TYPE.find((item) => item.key === role);

    if (find) return find.value;
    return "환자";
  }, [role]);

  const fullDate = useMemo(
    () => dayjs(date).add(index * 30, "minute"),
    [date, index],
  );

  const time = useMemo(() => dayjs().diff(fullDate, "minute"), [fullDate]);
  const isUser = useMemo(() => classNames({ user: role === "USER" }), [role]);

  const isOpen = time >= -10;
  const isDone = time > 30;

  function firstButton() {
    if (isDone) {
      return <Btn type="disabled">종료되었습니다</Btn>;
    } else if (isOpen) {
      return <Btn type="primary">입장</Btn>;
    } else {
      return <Btn type="disabled">예약 시간이 아닙니다</Btn>;
    }
  }

  function showDetail() {
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
      <Image src={image} />
      <Info>
        <Line>
          <Item>
            <Big>{name}</Big>님
          </Item>
        </Line>
        <Line>
          <Item width="100px" className={isUser}>
            <MdPerson />
            {roleDisplay}
          </Item>
          <Item>
            <MdCalendarMonth />
            {fullDate.format(DAYJS_FORMAT)}
          </Item>
        </Line>
        <Line>
          <Item className={isUser}>
            <MdLocalHospital />
            {dept}
          </Item>
        </Line>
      </Info>
      <ButtonContainer>
        {firstButton()}
        <Btn type="info" onClick={showDetail}>
          상세 정보
        </Btn>
      </ButtonContainer>
    </Container>
  );
};

ReservationItem.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  date: PropTypes.string,
  dept: PropTypes.string,
  index: PropTypes.number,
};

ReservationItem.defaultProps = {
  role: "USER",
};

export default ReservationItem;
