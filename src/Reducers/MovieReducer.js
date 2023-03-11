import * as Actions from "../Actions/MovieAction";
import { TABS, CATEGORIES } from "../constants";

const initialState = {
  movieList: [],
  favoriteMovieList: [],
  ratedMovieList: [],
  currentPage: 1,
  totalPages: 99,
  currentCategory: CATEGORIES.NOW_PLAYING.value,
  loading: false,
  error: null,
  accountId: 0,
  username: "",
  isLoggedin: false,
  sessionId: "",
  movieDetails: []
  // isLiked: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.MOVIE_SET_TOTAL_PAGES: {
      return { ...state, totalPages: action.payload };
    }
    case Actions.MOVIE_NEXT_PAGE: {
      const currentPage =
        state.currentPage === state.totalPages
          ? state.totalPages
          : state.currentPage + 1;
      return { ...state, currentPage: currentPage };
    }
    case Actions.MOVIE_PREV_PAGE: {
      const currentPage = state.currentPage === 1 ? 1 : state.currentPage - 1;
      return { ...state, currentPage: currentPage };
    }
    case Actions.MOVIE_LOAD_MOVIES_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_LOAD_MOVIES_SUCCESS: {
      return { ...state, loading: false, movieList: action.payload };
    }
    case Actions.MOVIE_LOAD_MOVIES_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    case Actions.MOVIE_SELECT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload.category,
        currentPage: action.payload.page
      };
    }
    case Actions.MOVIE_LOGIN_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        accountId: action.payload.accountId,
        username: action.payload.username,
        isLoggedin: true,
        sessionId: action.payload.sessionId
      };
    }
    case Actions.MOVIE_LOGIN_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    case Actions.MOVIE_LOGOUT: {
      return {
        ...state,
        accountId: 0,
        username: "",
        isLoggedin: false,
        sessionId: ""
      };
    }
    case Actions.MOVIE_LOAD_FAVORITE_MOVIES_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_LOAD_FAVORITE_MOVIES_SUCCESS: {
      return { ...state, loading: false, favoriteMovieList: action.payload };
    }
    case Actions.MOVIE_LOAD_FAVORITE_MOVIES_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    case Actions.MOVIE_LOAD_RATED_MOVIES_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_LOAD_RATED_MOVIES_SUCCESS: {
      return { ...state, loading: false, ratedMovieList: action.payload };
    }
    case Actions.MOVIE_LOAD_RATED_MOVIES_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    case Actions.MOVIE_ADD_FAVORITE_MOVIE_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_ADD_FAVORITE_MOVIE_SUCCESS: {
      return { ...state, laoding: false };
    }
    case Actions.MOVIE_ADD_FAVORITE_MOVIE_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    case Actions.MOVIE_SELECT_RATE_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_SELECT_RATE_SUCCESS: {
      return { ...state, laoding: false };
    }
    case Actions.selectRateFailedAction: {
      return { ...state, loading: false, error: action.payload };
    }
    case Actions.MOVIE_GET_MOVIE_DETAIL_START: {
      return { ...state, loading: true, error: null };
    }
    case Actions.MOVIE_GET_MOVIE_DETAIL_SUCCESS: {
      return { ...state, loading: false, movieDetails: action.payload };
    }
    case Actions.MOVIE_GET_MOVIE_DETAIL_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    // case Actions.MOVIE_TOGGLE_FAVORITE: {
    //   if (state.isLoggedin) {
    //     const isFavorite = state.favoriteMovieList.find((favoriteMovie) => {
    //       return favoriteMovie.id === state.movieList.id;
    //     });

    //     if (isFavorite) {
    //       dispatch(addFavoriteMovieAction(movieState.sessionId, movie.id, false));
    //     } else {
    //       dispatch(addFavoriteMovieAction(movieState.sessionId, movie.id, true));
    //     }
    //   }
    //   const currentIsLiked = !state.isLiked;
    //   return { ...state, isLiked: currentIsLiked };
    // }
    default:
      return state;
  }
};

export default reducer;
