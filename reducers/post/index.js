import * as actions from "../../constant/actionType";

const initState = {
  post: []
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOADPOST:
      return {
        ...state,
        post: action.payload
      };

    default:
        return state;
  }
};

export default postReducer;
