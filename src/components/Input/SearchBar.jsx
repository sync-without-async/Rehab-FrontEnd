import styled from "styled-components";
import Iconsearch from "../../assets/icons/iconsearch.png";
import { useContext } from "react";
import { ReducerContext } from "../../reducer/context.js";
import { debounce } from "../../librarys/util.js";
import PropTypes from "prop-types";

const SearchContainer = styled.div`
  width: 500px;
  height: 40px;
  background-color: #fafafa;
  border: 1px solid #bbbbbb;
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
    color: #c8c8c8;
  }
  &:focus {
    outline: none;
  }
`;

const SearchBar = ({ placeholder }) => {
  const [state, dispatch] = useContext(ReducerContext);

  function onChange(event) {
    const value = event.target.value;

    dispatch({
      type: "query",
      payload: value,
    });
  }

  return (
    <SearchContainer>
      <SearchIcon src={Iconsearch} alt="Search" />
      <SearchInput
        name="search"
        onChange={debounce(onChange, 400)}
        placeholder={placeholder}
      />
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "",
};

export default SearchBar;
