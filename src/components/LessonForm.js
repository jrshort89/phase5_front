import { TextareaAutosize } from "@material-ui/core";
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import SubjectsMenu from "../menus/SubjectsMenu";
import Modal from "./modal/Modal";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

class LessonForm extends Component {
  state = {
    codeValue: "const newProblem = () => {\n    // write some code here\n}",
    solution: null,
    test: null,
    modal: false,
    name: "",
    text: "",
    subject: "",
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

  onChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  onChangeText = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onChangeSubject = (event) => {
    this.setState({
      subject: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const test = Function(this.state.codeValue);
    this.setState({
      test: test() === Function(this.state.solution)(),
      modal: true,
    });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
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
            onChange={(event) => this.onChangeName(event)}
            value={this.state.name}
          />
          <br />
          <br />
          <TextareaAutosize
            style={{ width: "100%", backgroundColor: "grey", color: "white" }}
            rowsMin="5"
            className="CodeMirror"
            placeholder="Write the explanation!"
            name="explanation"
            onChange={(event) => this.onChangeText(event)}
            value={this.state.text}
          />
          <br />
          <br />
          <SubjectsMenu changeSubject={this.onChangeSubject} />
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
          <input type="submit" value="Submit" onSubmit={this.submitHandler} />
        </form>
        {this.state.name}
        {this.state.modal ? (
          <Modal
            open={this.toggleModal}
            onClose={this.toggleModal}
            name={this.state.name}
            text={this.state.text}
            codeValue={this.state.codeValue}
            solution={this.state.solution}
            subject={this.state.subject}
            test={this.state.test}
          />
        ) : null}
      </div>
    );
  }
}

export default LessonForm;