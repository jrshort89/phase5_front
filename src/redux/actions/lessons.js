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

export const setLesson = (lesson) => {
  return {
    type: actionTypes.LESSON,
    lesson: lesson,
  };
};

export const newLesson = (lesson, subject) => {
  return {
    type: actionTypes.NEW_LESSON,
    lesson: lesson,
    subject: subject,
  };
};

export const addSubject = (subject) => {
  return {
    type: actionTypes.ADD_SUBJECT,
    subject: subject,
  };
};

export const setCodeValue = (codeValue) => {
  return {
    type: actionTypes.CODE_VALUE,
    codeValue: codeValue,
  };
};

export const addLessonTest = (lessonTest) => {
  return {
    type: actionTypes.NEW_LESSON_TEST,
    lessonTest: lessonTest,
  };
};
