import * as actionTypes from "../actionsTypes";

const initialState = {
  solutions: [],
};

const solutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SOLUTIONS:
      return {
        ...state,
        solutions: action.solutions,
      };
    default:
      return state;
  }
};

export default solutionsReducer;
