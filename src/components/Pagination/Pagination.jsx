import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import leftArrow from '../../assets/icons/Page-left.png';
import rightArrow from '../../assets/icons/Page-right.png';
import './Pagination.css';

const StyledPaginateContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;
const StyledArrow = styled.img`
  height: 12px;
  vertical-align: middle;
`;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none; 
  .page-link {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 20px;
    font-weight: 300;
    line-height: 19px;
    letter-spacing: -0.02em;
    text-align: center;
    color: black;
    margin: 0 3px;
    padding: 5px 10px;
  }
  .active-link {
    color: #00418E;
    font-weight:bold;
  }
`;


function Pagination({ totalItems, itemsPerPage, onChange }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected);

    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <StyledPaginateContainer>
      <StyledReactPaginate
        previousLabel={<StyledArrow src={leftArrow} alt="Prev" />}
        nextLabel={<StyledArrow src={rightArrow} alt="Next" />}
        breakLabel="..."
        pageCount={totalItems / itemsPerPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={currentPage}
        pageClassName={"page"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeLinkClassName={"active-link"}
      />
    </StyledPaginateContainer>
  );
}
Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default Pagination;