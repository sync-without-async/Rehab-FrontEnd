import styled from "styled-components";
import {
  MdAssignment,
  MdPersonAddAlt1,
  MdVideoChat,
  MdDirectionsRun,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { selectRole } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";
import CardButton from "../Button/CardButton.jsx";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const doctorButtons = [
  {
    icon: <MdAssignment />,
    title: "환자 목록",
    description: "담당 환자들의 차트를 둘러봅니다.",
    link: "/chart",
  },
  {
    icon: <MdVideoChat />,
    title: "실시간 비대면 진료",
    description: "담당 환자와 실시간 비대면\n진료를 진행합니다.",
    link: "/meeting",
  },
  {
    icon: <MdPersonAddAlt1 />,
    title: "환자 등록",
    description: "새로운 환자를 등록하고\n차트를 작성합니다.",
    link: "/chart/create",
  },
];

const therapistButtons = [
  {
    icon: <MdDirectionsRun />,
    title: "운동 목록",
    description: "등록된 운동 목록을 둘러보거나,\n새로운 운동을 등록합니다.",
    link: "/video",
  },
  {
    icon: <MdVideoChat />,
    title: "실시간 비대면 진료",
    description: "담당 환자와 실시간 비대면\n진료를 진행합니다.",
    link: "/meeting",
  },
  {
    icon: <MdAssignment />,
    title: "환자 목록",
    description:
      "담당 환자들의 차트를 둘러보거나\n환자에게 재활 프로그램을 할당합니다.",
    link: "/chart",
  },
];

const QuickLink = () => {
  const role = useSelector(selectRole);

  const list = useMemo(() => {
    if (role === ROLE_TYPE.ADMIN_DOCTOR) {
      return doctorButtons;
    } else if (role === ROLE_TYPE.ADMIN_THERAPIST) {
      return therapistButtons;
    } else {
      return [];
    }
  }, [role]);

  return (
    <Container>
      {list.map((item, index) => (
        <CardButton key={index} {...item} />
      ))}
    </Container>
  );
};

export default QuickLink;
