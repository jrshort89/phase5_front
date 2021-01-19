import * as actionTypes from "../actionsTypes";
import axios from "../../axios";

const initialState = {
  name: "lesson name here",
  lessons: [],
  lesson: null,
  subjects: [],
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
    case actionTypes.NEW_LESSON:
      axios
        .post("/lessons", {
          withCredentials: true,
          lesson: action.lesson,
          subject: action.subject,
        })
        .then((res) => console.log(res));
      return {
        ...state,
      };
    case actionTypes.ADD_SUBJECT:
      if (state.subjects.includes(action.subject)) return state;
      return {
        ...state,
        subjects: [...state.subjects, action.subject],
      };
    default:
      return {
        ...state,
      };
  }
};

export default lessonReducer;
