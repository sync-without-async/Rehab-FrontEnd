import styled from "styled-components";
import UserAssignList from "../../components/UserDashBoard/UserAssignList";
import UserUntactRecord from "../../components/UserDashBoard/UserUntactRecord";
import PageContainer from "../../components/Common/PageContainer.jsx";
import UserHeader from "../../components/Dashboard/UserHeader.jsx";

const Container = styled(PageContainer)`
  gap: 28px;
`;

const MyUserPage = () => {
  return (
    <Container>
      <UserHeader />
      <UserAssignList />
      <UserUntactRecord />
    </Container>
  );
};

export default MyUserPage;
