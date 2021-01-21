import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import SubjectsMenu from "../menus/SubjectsMenu";
import LessonTests from "./LessonTests";
import Modal from "./modal/Modal";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/javascript/javascript.js");

class LessonForm extends Component {
  state = {
    codeValue:
      "function newProblem() {\n    // write some code here\n return 6 \n};",
    solution: "",
    arguments: null,
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

  onChangeSolution = (event) => {
    this.setState({
      solution: event.target.value,
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

  onChangeArguments = (event) => {
    const input = Function("return " + event.target.value)();
    this.setState({
      arguments: input,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({
      modal: true,
    });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onSubmitTest = () => {
    this.setState({
      solution: "",
      arguments: "",
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="name"
            style={{
              width: "60%",
              backgroundColor: "inherit",
              color: "white",
              fontSize: "20px",
            }}
            onChange={(event) => this.onChangeName(event)}
            value={this.state.name}
          />
          <br />
          <br />
          <SubjectsMenu
            changeSubject={this.onChangeSubject}
            style={{ fontSize: "20px" }}
          />
          <br />
          <br />
          <TextareaAutosize
            style={{
              width: "100%",
              backgroundColor: "inherit",
              color: "inherit",
            }}
            rowsMin="5"
            className="CodeMirror"
            placeholder="Write the explanation!"
            name="explanation"
            onChange={(event) => this.onChangeText(event)}
            value={this.state.text}
          />
          <br />
          <br />
          <div style={{ display: "inline", justifyContent: "space-evenly" }}>
            <div>
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
            </div>
            <br />
            <div>
              <LessonTests
                codeValue={this.state.codeValue}
                solution={this.state.solution}
                arguments={this.state.arguments}
                onSubmitTest={this.onSubmitTest}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Arguments"
                variant="outlined"
                name="name"
                style={{
                  width: "60%",
                  backgroundColor: "inherit",
                  color: "white",
                  fontSize: "20px",
                }}
                onChange={(event) => this.onChangeArguments(event)}
                value={this.state.arguments}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Expected output"
                variant="outlined"
                name="name"
                style={{
                  width: "60%",
                  backgroundColor: "inherit",
                  color: "white",
                  fontSize: "20px",
                }}
                onChange={(event) => this.onChangeSolution(event)}
                value={this.state.solution}
              />
            </div>
          </div>
          <br />
          <br />
          <TextField
            type="submit"
            value="Submit"
            onSubmit={this.submitHandler}
            style={{ width: "60%" }}
          />
        </form>
        {this.state.modal ? (
          <Modal
            open={this.toggleModal}
            onClose={this.toggleModal}
            name={this.state.name}
            text={this.state.text}
            codeValue={this.state.codeValue}
            solution={this.state.solution}
            subject={this.state.subject}
            arguments={this.state.arguments}
          />
        ) : null}
      </div>
    );
  }
}

export default LessonForm;
