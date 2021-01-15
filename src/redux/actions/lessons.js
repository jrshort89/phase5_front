import * as actionTypes from "../actionsTypes";

export const setLessonName = (name) => {
  return {
    type: actionTypes.LESSON_NAME,
    name: name,
  };
};

export const setLessons = (lessons) => {
  return {
    type: actionTypes.LESSONS,
    lessons: lessons,
  };
};
