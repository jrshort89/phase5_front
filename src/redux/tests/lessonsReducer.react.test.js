import reducer from "../reducers/lessonsReducer";
// import * as actionTypes from "../actions";
import * as lessonsActions from "../actions/lessons";

describe("lessons reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      name: "lesson name here",
      lessons: [],
    });
  });

  it("should update the lessons array", () => {
    expect(reducer(undefined, lessonsActions.setLessons(["lessons"]))).toEqual({
      name: "lesson name here",
      lessons: ["lessons"],
    });
  });
});
