import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";

const Container = styled.div`
  width: 800px;
  height: 635px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 20px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const filterlist = ["팔 재활", "어깨 재활", "허벅지 재활", "무릎 재활"];

const TheraExerciseList = () => {
  const totalItems = 40;
  const itemsPerPage = 8;

  const handlePageChange = (selectedPage) => {
    console.log("Selected page:", selectedPage);
  };
  return (
    <Container>
      <Title>운동 목록</Title>
      <Divider />
      <SearchAndFilterContainer>
        <SearchBar />
        <DropdownFilter items={filterlist} />
      </SearchAndFilterContainer>
      

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default TheraExerciseList ;
