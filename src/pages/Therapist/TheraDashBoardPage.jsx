import styled from "styled-components";
import CardButton from "../../components/Button/CardButton";
import ReservationMiniList from "../../components/Reservation/ReservationMiniList.jsx";
import { MdDirectionsRun, MdVideoChat, MdAssignment } from "react-icons/md";
import PageContainer from "../../components/Common/PageContainer.jsx";
import EmployeeHeader from "../../components/Dashboard/EmployeeHeader.jsx";

const Container = styled(PageContainer)`
  gap: 28px;
`;

const CardButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const buttons = [
  {
    icon: <MdDirectionsRun />,
    title: "운동 목록",
    description: "등록된 운동 목록을 둘러보거나,\n새로운 운동을 등록합니다.",
    link: "/theraexerciselist",
  },
  {
    icon: <MdVideoChat />,
    title: "실시간 비대면 진료",
    description: "담당 환자와 실시간 비대면\n진료를 진행합니다.",
    link: "/untact/list",
  },
  {
    icon: <MdAssignment />,
    title: "환자 목록",
    description:
      "담당 환자들의 차트를 둘러보거나\n환자에게 재활 프로그램을 할당합니다.",
    link: "/therapatientlist",
  },
];

const TheraDashBoardPage = () => {
  return (
    <Container>
      <EmployeeHeader />
      <CardButtonGroup>
        {buttons.map((item, index) => (
          <CardButton key={index} {...item} />
        ))}
      </CardButtonGroup>
      <ReservationMiniList />
    </Container>
  );
};

export default TheraDashBoardPage;
