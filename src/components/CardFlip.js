import React from "react";
import ReactCardFlip from "react-card-flip";
import SimpleCard from "./SimpleCard";
import Quiz from "./Quiz";

export default class CardFlip extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <SimpleCard
          flipHandler={this.handleClick}
          title={this.props.quizName}
        />

        <Quiz questions={this.props.questions} flipHandler={this.handleClick} />
      </ReactCardFlip>
    );
  }
}
