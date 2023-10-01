import styled from "styled-components";
import DoctorSeveralReserve from "./DoctorSeveralReserve";
import Pagination from "../Pagination/Pagination";

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
  display: flex;
  flex-wrap: wrap;
  gap: 0px 80px;
  flex-direction: column; 
  justify-content: flex-start;
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
  margin-top:10px;
  margin-bottom: 20px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px; 
`;

const DoctorUntactFullList = () => {
  const totalItems = 40;
  const itemsPerPage = 8;

  const handlePageChange = (selectedPage) => {
    console.log("Selected page:", selectedPage);
  };

  return (
    <Container>
      <Title>비대면 진료 예약 목록</Title>
      <Divider />
      <DoctorSeveralReserve/>
      <DoctorSeveralReserve/>
      <DoctorSeveralReserve/>
      <DoctorSeveralReserve/>
      <DoctorSeveralReserve/>
      <PaginationWrapper>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default DoctorUntactFullList;
