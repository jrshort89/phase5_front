import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Browser from "./Browser";
import Console from "./Console";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

export default class Lesson extends Component {
  state = {
    codeValue: "console.log('test')",
    history: [],
    submitCode: ""
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
            submitCode: this.state.codeValue
        })  
  }

  render() {
    return (
      <>
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
          onChange={(editor, data, value) => {
            return;
          }}
        />
        <button onClick={this.onSubmitCode}>Submit</button>
        <Browser
          playgroundId={null}
          html={null}
          css={null}
          js={this.state.submitCode}
        //   addHistory={this.addHistory}
        />
        <Console history={[{ text: this.state.history }]} />
      </>
    );
  }
}
