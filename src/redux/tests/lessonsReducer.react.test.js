import reducer from "../reducers/lessonsReducer";
import * as lessonsActions from "../actions/lessons";

describe("lessons reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      name: "lesson name here",
      lessons: [],
      lessonId: null,
    });
  });

  it("should update the lessons array", () => {
    expect(reducer(undefined, lessonsActions.setLessons(["lessons"]))).toEqual({
      name: "lesson name here",
      lessons: ["lessons"],
      lessonId: null,
    });
  });

  it("should update the lessons id", () => {
    expect(reducer(undefined, lessonsActions.setLessonId(1))).toEqual({
      name: "lesson name here",
      lessons: [],
      lessonId: 1,
    });
  });
});
