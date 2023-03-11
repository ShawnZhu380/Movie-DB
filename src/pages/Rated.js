import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRatedMoviesAction } from "../Actions/MovieAction";
import RatedMovieCardsList from "../components/RatedMovieCardsList";

export default function Rated() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRatedMoviesAction(movieState.sessionId));
  }, [movieState.sessionId]);

  return (
    <div>
      <h1>Rated Movies</h1>
      <RatedMovieCardsList />
    </div>
  );
}
