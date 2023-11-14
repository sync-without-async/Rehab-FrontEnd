import styled from "styled-components";
import ReservationMiniList from "../components/Reservation/ReservationMiniList.jsx";
import PageContainer from "../components/Common/PageContainer.jsx";
import EmployeeHeader from "../components/Dashboard/EmployeeHeader.jsx";
import { useSelector } from "react-redux";
import { selectRole } from "../redux/userSlice.js";
import { useMemo } from "react";
import { ROLE_TYPE } from "../librarys/type.js";
import UserHeader from "../components/Dashboard/UserHeader.jsx";
import UserAssignList from "../components/UserDashBoard/UserAssignList.jsx";
import QuickLink from "../components/Dashboard/QuickLink.jsx";

const Container = styled(PageContainer)`
  gap: 28px;
`;

const DashboardPage = () => {
  const role = useSelector(selectRole);

  const component = useMemo(() => {
    if (role === ROLE_TYPE.USER) {
      return (
        <>
          <UserHeader />
          <UserAssignList />
        </>
      );
    } else {
      return (
        <>
          <EmployeeHeader />
          <QuickLink />
        </>
      );
    }
  }, [role]);

  return (
    <Container>
      {component}
      <ReservationMiniList />
    </Container>
  );
};

export default DashboardPage;
