import React, { useEffect } from "react";
import CategorySelector from "../components/CategorySelector";
import MovieCardsList from "../components/MovieCardsList";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { loadMoviesAction } from "../Actions/MovieAction";

export default function Home() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadMoviesAction(movieState.currentCategory, movieState.currentPage)
    );
  }, [movieState.currentCategory, movieState.currentPage]);

  return (
    <div className="App">
      <Pagination />
      <CategorySelector />
      <MovieCardsList />
    </div>
  );
}
