import styled from "styled-components";
import Pagination from '../Pagination/Pagination';
import UserUntactList from '../UserDashBoard/UserUntactList';

const Container = styled.div`
  width: 800px;
  height: 885px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  display: inline-block;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  width: 140px;
  height: 30px;
  background-color: #3592FF;
  font-weight: 300;
  color: #FEFDFD;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const UserReserveList = () => {

  const totalItems = 25; 
  const itemsPerPage = 5;

  const handlePageChange = (selectedPage) => {
    console.log("Selected page:", selectedPage);
  };

  return (
    <Container>
      <Title>비대면 진료 예약 목록</Title>
      <ButtonGroup>
        <Button>예약 신청</Button> 
      </ButtonGroup>
      <Divider />
      <UserUntactList/>
      <UserUntactList/>
      <UserUntactList/>
      <UserUntactList/>
      <UserUntactList/>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onChange={handlePageChange}
      />

    </Container>
  );
};

export default UserReserveList;


