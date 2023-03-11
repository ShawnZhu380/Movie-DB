import React from "react";
import styled from "styled-components";
import { getImgUrl } from "../helpers";
import { HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  toggleLikedAction,
  addFavoriteMovieAction
} from "../Actions/MovieAction";
import { useDispatch, useSelector } from "react-redux";

// const MovieCardContainer = styled.div`
//   text-align: center;
// `;
const MovieCardContainer = styled.div`
  text-align: center;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  .movie-img img {
    width: 100%;
  }

  .movie-title {
    font-size: 1.2rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  .movie-title:hover {
    color: #90cea1;
  }

  .rating-liked {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
  }

  .rating-liked .icon {
    font-size: 1.5rem;
  }

  .rating-liked .rating {
    display: flex;
    align-items: center;
  }

  .rating-liked .icon.ion-md-heart-empty {
    cursor: pointer;
  }
  .rating-liked .icon.ion-md-heart {
    cursor: pointer;
    color: red;
  }

  .rating-liked .icon.rating-icon {
    color: #f5c518;
    margin-right: 0.5rem;
    cursor: default;
  }
  .liked-icon {
    color: red;
  }
`;

export default function MovieCard({ movie, favorite, onToggle }) {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  // const toggleLiked = () => {
  //   dispatch(toggleLikedAction());
  // };

  // const isLiked = ()=>{
  //   const
  // }

  return (
    <MovieCardContainer>
      <div className="movie-img">
        <img src={getImgUrl(movie.poster_path)} alt={movie.title} />
      </div>
      <Link to={`/movies/${movie.id}`}>
        <h4 className="movie-title">{movie.title}</h4>
      </Link>
      <div className="rating-liked">
        <div className="rating">
          <i className="icon star">
            <StarFilled />
          </i>
          <span>
            {movie.rating
              ? `${movie.vote_average} / ${movie.rating}`
              : movie.vote_average}
          </span>
        </div>
        <div
          className="liked"
          onClick={() => {
            onToggle(movie);
          }}
        >
          {favorite ? (
            <i className="liked-icon icon">
              <HeartFilled />
            </i>
          ) : (
            <i className="icon">
              <HeartOutlined />
            </i>
          )}
        </div>
      </div>
    </MovieCardContainer>
  );
}
