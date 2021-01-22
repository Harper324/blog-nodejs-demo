import { combineReducers } from "redux";
import postReducer from "./post/index";

export default combineReducers({
    post: postReducer
  });