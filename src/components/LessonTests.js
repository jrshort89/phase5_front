import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
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

  return (
    <div style={{ float: "right", width: "40%" }}>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {testHandler() ? (
          <CheckCircleOutlineIcon
            style={{ color: "green", fontSize: "3rem" }}
          />
        ) : (
          <CancelIcon style={{ color: "red", fontSize: "3rem" }} />
        )}
      </div>
      <Paper
        style={{ float: "left", width: "100%", fontSize: "20px" }}
        elevation={3}
      >
        {runFunction()}
      </Paper>
      <Paper
        style={{ float: "left", width: "50%", fontSize: "20px" }}
        elevation={3}
      >
        {props.arguments}
      </Paper>
      <Paper
        style={{ float: "right", width: "50%", fontSize: "20px" }}
        elevation={3}
      >
        {props.solution}
      </Paper>
    </div>
  );
}
