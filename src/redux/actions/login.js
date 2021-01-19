import * as actionTypes from "../actionsTypes";

export const setLoggedIn = () => {
  return {
    type: actionTypes.LOGGED_IN,
  };
};

export const setUsername = (name) => {
  return {
    type: actionTypes.USERNAME,
    username: name,
  };
};

export const loginRequest = (data) => {};
