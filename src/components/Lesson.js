import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Button from "@material-ui/core/Button";
import ChallengeTests from "./ChallengeTests";
import axios from "../axios";
import { connect } from "react-redux";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

class Lesson extends Component {
  state = {
    codeValue: "",
  };

  onChangeCodeValue = (value) => {
    this.setState({
      codeValue: value,
    });
  };

  onSubmitCode = () => {
    const user_id = window.sessionStorage.getItem("user_id");
    axios
      .post("/solutions", {
        solution: {
          text: this.state.codeValue,
          lesson_id: this.props.lesson.id,
          user_id: user_id,
        },
        user_id: user_id,
      })
      .then((res) => console.log(res));
  };

  testHandler = () => {
    try {
      let test = function (input) {
        return input;
      };
      let solution = function (solution) {
        return solution;
      };
      return test() === solution();
    } catch {
      return false;
    }
  };

  render() {
    return (
      <>
        <div
          style={{
            fontSize: "20px",
            fontFamily: "inherit",
          }}
        >
          {this.props.lesson?.text}
        </div>
        <br></br>
        <br></br>
        <CodeMirror
          value={
            this.state.codeValue
              ? this.state.codeValue
              : this.props.lesson?.exercise
          }
          options={{
            lineNumbers: true,
            mode: "javascript",
            theme: "material",
          }}
          onBeforeChange={(editor, data, value) => {
            this.onChangeCodeValue(value);
          }}
        />
        <Button
          onClick={this.onSubmitCode}
          style={{ float: "right" }}
          variant="outlined"
        >
          Submit
        </Button>
        <ChallengeTests
          codeValue={this.state.codeValue}
          tests={this.props.lesson?.tests}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lesson: state.lesson.lesson,
  };
};

export default connect(mapStateToProps, null)(Lesson);
