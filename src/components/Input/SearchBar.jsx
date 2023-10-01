import styled from 'styled-components';
import Iconsearch from "../../assets/icons/iconsearch.png";

const SearchContainer = styled.div`
  width: 500px;
  height: 40px;
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 20px; 
  height: 20px;
  margin-left: 10px;
`;

const SearchInput = styled.input`
  width: calc(100% - 40px); 
  height: 100%;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #000;
  padding-left: 10px; 
  &::placeholder {
    color: #C8C8C8;
  }
  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchIcon src={Iconsearch} alt="Search" />
      <SearchInput placeholder="환자 이름으로 검색...." />
    </SearchContainer>
  );
};

export default SearchBar;
