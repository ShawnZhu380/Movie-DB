import React from "react";
import { CATEGORIES } from "../constants";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../Actions/MovieAction";

const Category = styled.div`
  display: flex;
  /* display: flex; */
  align-items: flex-end;
  /* justify-content: center; */
  flex-direction: column;
  margin: 10px;

  .title {
    margin-right: 40px;
  }
`;

export default function CategorySelector() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const options = Object.values(CATEGORIES);
  return (
    <Category>
      <div className="title">Category</div>
      <select
        value={movieState.currentCategory}
        onChange={(e) => dispatch(selectCategory(e.target.value))}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
    </Category>
  );
}
