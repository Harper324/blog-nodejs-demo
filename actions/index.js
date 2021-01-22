import Axios from "axios";
import * as actions from "../constant/actionType";

export const loadPost = () => dispatch => {
  return Axios.get("http://localhost:8080")
  .then(res => {
    dispatch({
      type: actions.LOADPOST,
      payload: res
    });
  });
};
