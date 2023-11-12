import styled from "styled-components";
import CardButton from "../../components/Button/CardButton";
import ReservationMiniList from "../../components/Reservation/ReservationMiniList.jsx";
import PageContainer from "../../components/Common/PageContainer.jsx";
import EmployeeHeader from "../../components/Dashboard/EmployeeHeader.jsx";
import { MdAssignment, MdPersonAddAlt1, MdVideoChat } from "react-icons/md";

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
    icon: <MdAssignment />,
    title: "환자 목록",
    description: "담당 환자들의 차트를 둘러봅니다.",
    link: "/doctorpatientlist",
  },
  {
    icon: <MdVideoChat />,
    title: "실시간 비대면 진료",
    description: "담당 환자와 실시간 비대면\n진료를 진행합니다.",
    link: "/untact/list",
  },
  {
    icon: <MdPersonAddAlt1 />,
    title: "환자 등록",
    description: "새로운 환자를 등록하고\n차트를 작성합니다.",
    link: "/doctorchart",
  },
];

const DoctorDashBoardPage = () => {
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

export default DoctorDashBoardPage;
