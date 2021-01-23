import * as actionTypes from "../actionsTypes";
import axios from "../../axios";

export const setSolutions = () => {
    let solutions;
    axios.get("/solutions").then((res) => {
        solutions = res.data;
      });
    return {
        type: actionTypes.SET_SOLUTIONS,
        solutions: solutions
    };
};
