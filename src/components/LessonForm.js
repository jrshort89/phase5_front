import { TextareaAutosize } from "@material-ui/core";
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
// import { test } from "jest";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

class LessonForm extends Component {
  state = {
    codeValue: "function newProblem () {\n    // write some code here\n}",
    solution: "Solution",
    test: "testtttt",
  };

  onChangeCodeValue = (value) => {
    this.setState({
      codeValue: value,
    });
  };

  onChangeSolution = (value) => {
    this.setState({
      solution: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const test = Function(this.state.codeValue);
    this.setState({
      test: test() === Function(this.state.solution)(),
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            name="name"
            style={{
              width: "60%",
              backgroundColor: "grey",
              color: "white",
              fontSize: "20px",
            }}
          />
          <br />
          <br />
          <TextareaAutosize
            style={{ width: "100%", backgroundColor: "grey", color: "white" }}
            rowsMin="5"
            className="CodeMirror"
            placeholder="Write the explanation!"
            name="explanation"
          />
          <CodeMirror
            value={this.state.codeValue}
            options={{
              lineNumbers: true,
              mode: "javascript",
              theme: "material",
            }}
            onBeforeChange={(editor, data, value) => {
              // this.setState({ codeValue: value });
              this.onChangeCodeValue(value);
            }}
          />
          <br />
          <br />
          {this.state.test ? "true" : "false"}
          <CodeMirror
            value={this.state.solution}
            options={{
              lineNumbers: true,
              mode: "javascript",
              theme: "material",
            }}
            onBeforeChange={(editor, data, value) => {
              // this.setState({ codeValue: value });
              this.onChangeSolution(value);
            }}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LessonForm;
