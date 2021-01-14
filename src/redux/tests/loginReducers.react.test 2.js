import reducer from "../reducers/loginReducers";
import * as actionTypes from "../actions";

describe("login reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(
      {
        loggedIn: false,
        userId: null,
        username: "Jake"
      },
    );
  });

  it("should handle LOGGED_IN", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.LOGGED_IN,
      })
    ).toEqual(
      {
        loggedIn: true,
        userId: null,
        username: "Jake"
      },
    );

    });

    it("should handle USERNAME", () => {
        expect(
        reducer(undefined, {
            type: actionTypes.USERNAME,
            username: "BilboBaggins"
        })
        ).toEqual(
        {
            loggedIn: false,
            userId: null,
            username: "BilboBaggins"
        },
        );
    });
});
