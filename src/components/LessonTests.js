import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import * as actions from "../redux/actions/lessons";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function LessonTests(props) {
  const dispatch = useDispatch();
  const lessonTests = useSelector((state) => state.lesson.lessonTests);
  const classes = useStyles();

  const testHandler = () => {
    // try {
    //   let test = Function("return " + props.codeValue)();
    //   let args = Function("return " + props.arguments)();
    //   return test(args) === Function("return " + props.solution)();
    // } catch {
    //   return false;
    // }
    try {
      let results;
      let test = Function("return " + props.codeValue)();
      let args = Function("return " + props.arguments)();
      let solution = Function("return " + props.solution)();
      if (Array.isArray(solution)) {
        const ans = test(args);
        for (let i = 0; i < solution.length; i++) {
          console.log(ans[i], solution[i]);
          if (ans[i] !== solution[i]) {
            results = false;
            break;
          }
          results = true;
        }
      } else {
        return test(args) === Function("return " + props.solution)();
      }
      return results;
    } catch {
      return false;
    }
  };

  const runFunction = () => {
    try {
      let args = Function("return " + props.arguments)();
      let test = Function("return " + props.codeValue)();
      return test(args);
    } catch {
      return "Error!";
    }
  };

  const submitTest = (newTest) => {
    dispatch(actions.addLessonTest(newTest));
    props.onSubmitTest();
  };

  const resultsHandler = (array) => {
    return array?.map((test, index) => {
      if (test === "") test = "none";
      return (
        <Paper
          style={{
            float: "left",
            width: "33.33%",
            fontSize: "20px",
          }}
          elevation={3}
        >
          {test}
        </Paper>
      );
    });
  };

  return (
    <>
      <div style={{ float: "right", width: "40%" }}>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {testHandler() ? (
            <CheckCircleOutlineIcon
              style={{ color: "green", fontSize: "3rem" }}
              onClick={() =>
                submitTest([props.arguments, props.solution, runFunction()])
              }
            />
          ) : (
            <CancelIcon style={{ color: "red", fontSize: "3rem" }} />
          )}
          <br />
        </div>
        {lessonTests?.map((test) => resultsHandler(test))}
      </div>
    </>
  );
}
