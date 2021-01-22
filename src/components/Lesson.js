import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Button from "@material-ui/core/Button";
import ChallengeTests from "./ChallengeTests";
import Browser from "./Browser";
import Console from "./Console";
import { connect } from "react-redux";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

class Lesson extends Component {
  state = {
    codeValue: "",
    history: [],
    submitCode: "",
  };

  componentDidMount() {
    this.onSubmitHistory();
  }

  onChangeCodeValue = (value) => {
    this.setState({
      codeValue: value,
    });
  };

  addHistory = (text) => {
    const newHistory = [text];
    this.setState({
      history: newHistory,
    });
    this.onSubmitHistory();
  };

  onSubmitHistory = () => {
    window.addEventListener("message", (e) => {
      // TODO: Match by origin
      // if (e.origin !== origin) return false;
      if (!e.data) return false; // only handle if theres data
      if (typeof e.data !== "string") return false; // data must be a string
      if (e.data.includes("_")) return false; // dont watch for events emitted by the react library
      this.addHistory(e.data);
    });
  };

  onSubmitCode = () => {
    this.setState({
      submitCode: this.state.codeValue,
    });
  };

  testHandler = () => {
    try {
      let test = Function("return " + this.state.codeValue)();
      return test() === Function("return " + this.props.lesson?.solution)();
    } catch {
      return false;
    }
  };

  render() {
    return (
      <>
        <br></br>
        <br></br>
        {console.log(this.props.lesson)}
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
            // this.setState({ codeValue: value });
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
        {this.testHandler() ? "true" : "no works"}
        <ChallengeTests
          codeValue={this.state.codeValue}
          tests={this.props.lesson?.tests}
        />
        {/* <Browser
          playgroundId={null}
          html={null}
          css={null}
          js={this.state.submitCode}
          //   addHistory={this.addHistory}
        />
        <Console history={[{ text: this.state.history }]} /> */}
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
