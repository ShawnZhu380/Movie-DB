import axios from "axios";
import { API_KEY } from "../constants";
export const MOVIE_LOAD_MOVIES_START = "MOVIE_LOAD_MOVIES_START";
export const MOVIE_LOAD_MOVIES_SUCCESS = "MOVIE_LOAD_MOVIES_SUCCESS";
export const MOVIE_LOAD_MOVIES_FAILED = "MOVIE_LOAD_MOVIES_FAILED";
export const MOVIE_NEXT_PAGE = "MOVIE_NEXT_PAGE";
export const MOVIE_PREV_PAGE = "MOVIE_PREV_PAGE";
export const MOVIE_SET_TOTAL_PAGES = "MOVIE_SET_TOTAL_PAGES";
export const MOVIE_LOAD_FAVORITE_MOVIES_START =
  "MOVIE_LOAD_FAVORITE_MOVIES_START";
export const MOVIE_LOAD_FAVORITE_MOVIES_SUCCESS =
  "MOVIE_LOAD_FAVORITE_MOVIES_SUCCESS";
export const MOVIE_LOAD_FAVORITE_MOVIES_FAILED =
  "MOVIE_LOAD_FAVORITE_MOVIES_FAILED";
export const MOVIE_LOAD_RATED_MOVIES_START = "MOVIE_LOAD_RATED_MOVIES_START";
export const MOVIE_LOAD_RATED_MOVIES_SUCCESS =
  "MOVIE_LOAD_RATED_MOVIES_SUCCESS";
export const MOVIE_LOAD_RATED_MOVIES_FAILED = "MOVIE_LOAD_RATED_MOVIES_FAILED";
export const MOVIE_ADD_FAVORITE_MOVIE_START = "MOVIE_ADD_FAVORITE_MOVIE_START";
export const MOVIE_ADD_FAVORITE_MOVIE_SUCCESS =
  "MOVIE_ADD_FAVORITE_MOVIE_SUCCESS";
export const MOVIE_ADD_FAVORITE_MOVIE_FAILED =
  "MOVIE_ADD_FAVORITE_MOVIE_FAILED";
export const MOVIE_SELECT_RATE_START = "MOVIE_SELECT_RATE_START";
export const MOVIE_SELECT_RATE_SUCCESS = "MOVIE_SELECT_RATE_SUCCESS";
export const MOVIE_SELECT_RATE_FAILED = "MOVIE_SELECT_RATE_FAILED";
export const MOVIE_SELECT_CATEGORY = "MOVIE_SELECT_CATEGORY";
// export const MOVIE_SELECT_TAB = "MOVIE_SELECT_TAB";
export const MOVIE_LOGIN_START = "MOVIE_LOGIN_START";
export const MOVIE_LOGIN_SUCCESS = "MOVIE_LOGIN_SUCCESS";
export const MOVIE_LOGIN_FAILED = "MOVIE_LOGIN_FAILED";
export const MOVIE_LOGOUT = "MOVIE_LOGOUT";
export const MOVIE_GET_MOVIE_DETAIL_START = "MOVIE_GET_MOVIE_DETAIL_START";
export const MOVIE_GET_MOVIE_DETAIL_SUCCESS = "MOVIE_GET_MOVIE_DETAIL_SUCCESS";
export const MOVIE_GET_MOVIE_DETAIL_FAILED = "MOVIE_GET_MOVIE_DETAIL_FAILED";
// export const MOVIE_TOGGLE_FAVORITE = "MOVIE_TOGGLE_FAVORITE";

export const setTotlaPagesAction = (pages) => {
  return {
    type: MOVIE_SET_TOTAL_PAGES,
    payload: pages
  };
};

export const moveToNextPage = () => {
  return { type: MOVIE_NEXT_PAGE };
};

export const moveToPrevPage = () => {
  return { type: MOVIE_PREV_PAGE };
};

export const loadMoviesStartAction = () => {
  return {
    type: MOVIE_LOAD_MOVIES_START
  };
};

export const loadMoviesSuccessAction = (data) => {
  return {
    type: MOVIE_LOAD_MOVIES_SUCCESS,
    payload: data
  };
};

export const loadMoviesFailedAction = (error) => {
  return {
    type: MOVIE_LOAD_MOVIES_FAILED,
    payload: error
  };
};

export const loadMoviesAction = (category, page) => {
  return (dispatch) => {
    dispatch(loadMoviesStartAction());

    // fetch(
    //   `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`
    // )
    //   .then((resp) => {
    //     return resp.json();
    //   })
    //   .then((data) => {
    //     dispatch(loadMoviesSuccessAction(data.results));
    //     dispatch(setTotlaPagesAction(data.total_pages));
    //   })
    //   .catch((error) => {
    //     dispatch(loadMoviesFailedAction(error));
    //   });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`
      )
      .then((resp) => {
        dispatch(loadMoviesSuccessAction(resp.data.results));
        dispatch(setTotlaPagesAction(resp.data.total_pages));
      })
      .catch((error) => {
        dispatch(loadMoviesFailedAction(error));
      });
  };
};

export const selectCategory = (category) => {
  return {
    type: MOVIE_SELECT_CATEGORY,
    payload: {
      category,
      page: 1
    }
  };
};

export const userLoginStartAction = () => {
  return { type: MOVIE_LOGIN_START };
};

export const userLoginSuccessAction = (data) => {
  return {
    type: MOVIE_LOGIN_SUCCESS,
    payload: data
  };
};

export const userLoginFaildAction = (error) => {
  return {
    type: MOVIE_LOGIN_FAILED,
    payload: error
  };
};

export const userLoginAction = (username, password) => {
  return (dispatch) => {
    let sessionId = "";
    dispatch(userLoginStartAction());

    axios
      .get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      )
      .then((resp) => {
        axios
          .post(
            `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
            {
              username: `${username}`,
              password: `${password}`,
              request_token: `${resp.data.request_token}`
            }
          )
          .then((resp) => {
            axios
              .post(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                { request_token: `${resp.data.request_token}` }
              )
              .then((resp) => {
                sessionId = resp.data.session_id;
                axios
                  .get(
                    `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
                  )
                  .then((resp) => {
                    dispatch(
                      userLoginSuccessAction({
                        accountId: resp.data.id,
                        username: resp.data.username,
                        sessionId: sessionId
                      })
                    );
                  })
                  .catch((error) => {
                    dispatch(userLoginFaildAction(error));
                  });
              })
              .catch((error) => {
                dispatch(userLoginFaildAction(error));
              });
          })
          .catch((error) => {
            dispatch(userLoginFaildAction(error));
          });
      })
      .catch((error) => {
        dispatch(userLoginFaildAction(error));
      });
  };
};

export const userLogoutAction = () => {
  return {
    type: MOVIE_LOGOUT
  };
};

export const loadFavoriteMoviesStartAction = () => {
  return {
    type: MOVIE_LOAD_FAVORITE_MOVIES_START
  };
};

export const loadFavoriteMoviesSuccessAction = (data) => {
  return {
    type: MOVIE_LOAD_FAVORITE_MOVIES_SUCCESS,
    payload: data
  };
};

export const loadFavoriteMoviesFailedAction = (error) => {
  return {
    type: MOVIE_LOAD_FAVORITE_MOVIES_FAILED,
    payload: error
  };
};

export const loadFavoriteMoviesAction = (sessionId) => {
  return (dispatch) => {
    dispatch(loadFavoriteMoviesStartAction());

    axios
      .get(
        `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
      )
      .then((resp) => {
        dispatch(loadFavoriteMoviesSuccessAction(resp.data.results));
      })
      .catch((error) => {
        dispatch(loadFavoriteMoviesFailedAction(error));
      });
  };
};

export const loadRatedMoviesStartAction = () => {
  return {
    type: MOVIE_LOAD_RATED_MOVIES_START
  };
};

export const loadRatedMoviesSuccessAction = (data) => {
  return {
    type: MOVIE_LOAD_RATED_MOVIES_SUCCESS,
    payload: data
  };
};

export const loadRatedMoviesFailedAction = (error) => {
  return {
    type: MOVIE_LOAD_RATED_MOVIES_FAILED,
    payload: error
  };
};

export const loadRatedMoviesAction = (sessionId) => {
  return (dispatch) => {
    dispatch(loadRatedMoviesStartAction());

    axios
      .get(
        `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`
      )
      .then((resp) => {
        dispatch(loadRatedMoviesSuccessAction(resp.data.results));
      })
      .catch((error) => {
        dispatch(loadRatedMoviesFailedAction(error));
      });
  };
};

export const addFavoriteMovieStartAction = () => {
  return {
    type: MOVIE_ADD_FAVORITE_MOVIE_START
  };
};

export const addFavoriteMovieSuccessAction = () => {
  return {
    type: MOVIE_ADD_FAVORITE_MOVIE_SUCCESS
  };
};

export const addFavoriteMovieFailedAction = (error) => {
  return {
    type: MOVIE_ADD_FAVORITE_MOVIE_FAILED,
    payload: error
  };
};

export const addFavoriteMovieAction = (sessionId, movieId, isFavorite) => {
  return (dispatch) => {
    dispatch(addFavoriteMovieStartAction());

    axios
      .post(
        `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
        { media_type: "movie", media_id: movieId, favorite: isFavorite }
      )
      .then((resp) => {
        dispatch(addFavoriteMovieSuccessAction());
        dispatch(loadFavoriteMoviesAction(sessionId));
      })
      .catch((error) => {
        dispatch(addFavoriteMovieFailedAction(error));
      });
  };
};

export const selectRateStartAction = () => {
  return {
    type: MOVIE_SELECT_RATE_START
  };
};

export const selectRateSuccessAction = () => {
  return {
    type: MOVIE_SELECT_RATE_SUCCESS
  };
};

export const selectRateFailedAction = (error) => {
  return {
    type: MOVIE_SELECT_RATE_FAILED,
    payload: error
  };
};

export const selectRateAction = (movieId, rateValue, sessionId) => {
  return (dispatch) => {
    dispatch(selectRateStartAction());

    axios
      .post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
        { value: rateValue }
      )
      .then((resp) => {
        dispatch(loadRatedMoviesAction(sessionId));
        dispatch(selectRateSuccessAction());
      })
      .catch((error) => {
        dispatch(selectRateFailedAction(error));
      });
  };
};

export const getMovieDetailStartAction = () => {
  return {
    type: MOVIE_GET_MOVIE_DETAIL_START
  };
};

export const getMovieDetailSuccessAction = (data) => {
  return {
    type: MOVIE_GET_MOVIE_DETAIL_SUCCESS,
    payload: data
  };
};

export const getMovieDetailFailedAction = (error) => {
  return {
    type: MOVIE_GET_MOVIE_DETAIL_FAILED,
    payload: error
  };
};

export const getMovieDetailAction = (movieId) => {
  return (dispatch) => {
    dispatch(getMovieDetailStartAction());

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((resp) => {
        dispatch(getMovieDetailSuccessAction(resp.data));
      })
      .catch((error) => {
        dispatch(getMovieDetailFailedAction(error));
      });
  };
};

// export const toggleFavoriteAction = () => {
//   return {
//     type: MOVIE_TOGGLE_FAVORITE
//   };
// };
