import { useContext, useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { ReducerContext } from "../../reducer/context.js";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const StyledPaginateContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;

  & .previous {
    display: flex;
    align-items: center;

    & > a {
      color: #667080;
    }
  }

  & .next {
    display: flex;
    align-items: center;

    & > a {
      color: #667080;
    }
  }

  & .page {
    display: flex;
    align-items: center;
  }

  & .page-link {
    width: 28px;
    height: 28px;
    margin: 0px 4px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }

  & .active-link {
    color: #00418e;
    font-size: 20px;
    font-weight: 800;
  }
`;

function Pagination({ className }) {
  const [state, dispatch] = useContext(ReducerContext);
  const { totalPage } = state || {};

  const handlePageClick = (data) => {
    dispatch({
      type: "page",
      payload: data.selected + 1,
    });
  };

  return (
    <StyledPaginateContainer className={className}>
      <StyledReactPaginate
        previousLabel={<MdOutlineArrowBackIos />}
        nextLabel={<MdOutlineArrowForwardIos />}
        breakLabel="..."
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
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
  className: PropTypes.string,
};

export default Pagination;
