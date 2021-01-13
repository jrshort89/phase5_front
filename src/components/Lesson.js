import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

export default class Lesson extends Component {
  //   const [codeValue, setCodeValue] = useState("<h1>I ♥ react-codemirror2</h1>");
  state = {
    codeValue: "<h1>I ♥ react-codemirror2</h1>",
  };

  onChangeCodeValue = (value) => {
    this.setState({
      codeValue: value,
    });
  };

  render() {
    return (
      <>
        <div>some text to be rendered for the lessons and stuff</div>
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
      </>
    );
  }
}
