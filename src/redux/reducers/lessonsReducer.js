import * as actionTypes from "../actions";

const initialState = {
  name: "lesson name here",
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LESSON_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return {
        ...state,
      };
  }
};

export default lessonReducer;
