import * as actionTypes from "../actionsTypes";

const initialState = {
  name: "lesson name here",
  lessons: [],
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LESSON_NAME:
      return {
        ...state,
        name: action.name,
      };
    case actionTypes.LESSONS:
      return {
        ...state,
        lessons: [...state.lessons, ...action.lessons],
      };
    default:
      return {
        ...state,
      };
  }
};

export default lessonReducer;
