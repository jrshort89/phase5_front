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
    try {
      let test = Function("return " + props.codeValue)();
      return test(props.arguments) === Function("return " + props.solution)();
    } catch {
      return false;
    }
  };

  const runFunction = () => {
    try {
      let test = Function("return " + props.codeValue)();
      return test(props.arguments);
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

  const submitTestsHandler = () => {
    console.log(lessonTests);
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
