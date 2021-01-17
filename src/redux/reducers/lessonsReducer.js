import * as actionTypes from "../actionsTypes";

const initialState = {
  name: "lesson name here",
  lessons: [],
  lesson: null,
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
        lessons: [...action.lessons],
      };
    case actionTypes.LESSON:
      return {
        ...state,
        lesson: action.lesson,
      };
    default:
      return {
        ...state,
      };
  }
};

export default lessonReducer;
