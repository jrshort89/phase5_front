import * as actionTypes from "../actionsTypes";
import axios from "../../axios";

const initialState = {
  name: "lesson name here",
  lessons: [],
  lesson: null,
  subjects: [],
  codeValue: "",
  lessonTests: [],
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
      let lesson;
      axios
        .post("/lessons", {
          withCredentials: true,
          lesson: action.lesson,
          subject: action.subject,
          lessonTests: state.lessonTests,
        })
        .then((res) => (lesson = res.data));
      return {
        ...state,
        lesson: [lesson],
        lessonTests: []
      };
    case actionTypes.ADD_SUBJECT:
      if (state.subjects.includes(action.subject)) return state;
      return {
        ...state,
        subjects: [...state.subjects, action.subject],
      };
    case actionTypes.CODE_VALUE:
      return {
        ...state,
        codeValue: action.codeValue,
      };
    case actionTypes.NEW_LESSON_TEST:
      return {
        ...state,
        lessonTests: [...state.lessonTests, action.lessonTest],
      };
    default:
      return {
        ...state,
      };
  }
};

export default lessonReducer;
