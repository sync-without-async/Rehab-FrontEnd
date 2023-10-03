import styled from "styled-components";
import InputDText from "../Input/InputDText";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";


const Container = styled.div`
  width: 800px;
  height: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top:10px;
  padding: 20px 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 20px;
`;

const OpinionTitle = styled.p`
  color: #000000;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const OpinionContent = styled.div`
  width: 720px;
  height: 100px;
  background-color: #CCCCCC;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  color: #666666;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;  
  justify-content: center;
  margin-bottom:40px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 720px;
`;

const filterlist = ["팔 재활", "어깨 재활", "허벅지 재활", "무릎 재활"];
const TheraMakeAssign = () => {

  return (
    <Container>
      <Title>과제 할당</Title>
      <Divider />
      <InputDText label="프로그램 설명 *" />
      <OpinionTitle>담당 전문의 재활 치료 소견서</OpinionTitle>
      <OpinionContent>
        이 환자는 특히 팔이 아프고 어쩌고 저쩌고 특히 이부분을 신경써서 과제를 만들어주세요
      </OpinionContent>
      <Divider />
      <OpinionTitle>과제 리스트 지정하기</OpinionTitle>
      <SearchAndFilterContainer>
        <SearchBar />
        <DropdownFilter items={filterlist} />
      </SearchAndFilterContainer>
    </Container>
  );
};

export default TheraMakeAssign;
