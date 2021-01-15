import * as actionTypes from "../actionsTypes";

const initialState = {
  loggedIn: true,
  username: "Jake",
  userId: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    case actionTypes.USERNAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return {
        ...state,
      };
  }
};

export default loginReducer;
