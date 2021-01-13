import * as actionTypes from "../actions";

const initialState = {
  loggedIn: false,
  username: "",
  userId: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        loggedIn: !state.loggedIn,
      };
    default:
      return {
        ...state,
      };
  }
};

export default loginReducer;
