import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavoriteMoviesAction } from "../Actions/MovieAction";
import FavoriteMovieCardsList from "../components/FavoriteMovieCardsList";

export default function Favorite() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoriteMoviesAction(movieState.sessionId));
  }, [movieState.sessionId]);

  return (
    <div>
      <h1>Favorite Movies</h1>
      {/* {console.log(movieState.favoriteMovieList)} */}
      <FavoriteMovieCardsList />
    </div>
  );
}
