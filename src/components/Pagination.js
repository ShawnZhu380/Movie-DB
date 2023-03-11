import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { moveToNextPage, moveToPrevPage } from "../Actions/MovieAction";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 1rem auto;
`;

export default function Pagination() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  return (
    <PaginationContainer>
      <Button
        type="primary"
        onClick={() => {
          dispatch(moveToPrevPage());
        }}
      >
        Prev
      </Button>
      <span>
        {movieState.currentPage} / {movieState.totalPages}
      </span>
      {/* <Button type="primary" onClick={dispatch(moveToNextPage())}> */}
      <Button
        type="primary"
        onClick={() => {
          dispatch(moveToNextPage());
        }}
      >
        Next
      </Button>
    </PaginationContainer>
  );
}
