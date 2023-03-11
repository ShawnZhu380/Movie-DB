import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovieAction } from "../Actions/MovieAction";

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

export default function MovieCardsList() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  const handleToggleFavorite = (movie) => {
    if (movieState.isLoggedin) {
      const isFavorite = movieState.favoriteMovieList.find((favoriteMovie) => {
        return favoriteMovie.id === movie.id;
      });

      if (isFavorite) {
        dispatch(addFavoriteMovieAction(movieState.sessionId, movie.id, false));
      } else {
        dispatch(addFavoriteMovieAction(movieState.sessionId, movie.id, true));
      }
    }
  };

  return (
    <MovieContainer>
      {/* {console.log(movieState.movieList)} */}
      {movieState.movieList.map((movie) => {
        const isFavorite = movieState.favoriteMovieList.find(
          (favoriteMovie) => {
            return favoriteMovie.id === movie.id;
          }
        );
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            favorite={isFavorite}
            onToggle={handleToggleFavorite}
          />
        );
      })}
    </MovieContainer>
  );
}
