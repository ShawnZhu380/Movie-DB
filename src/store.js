import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import movieReducer from "./Reducers/MovieReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  movie: movieReducer
});

const middlewares = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, middlewares);

export default store;
