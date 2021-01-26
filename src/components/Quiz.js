import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Confetti from "react-dom-confetti";

export default function Quiz(props) {
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 62,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const questions = props.questions?.map(
    ({ text, answer, option_one, option_two, option_three }) => {
      const arr = [
        { answerText: answer, isCorrect: true },
        { answerText: option_one, isCorrect: true },
        { answerText: option_two, isCorrect: true },
        { answerText: option_three, isCorrect: true },
      ];

      function shuffle(array) {
        let currentIndex = array.length,
          temporaryValue,
          randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      return { questionText: text, answerOptions: shuffle(arr) };
    }
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [confetti, releaseConfetti] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions?.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      releaseConfetti(true);
    }
  };
  return (
    <div className="app font">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions?.length}
            </div>
            <br />
            <div className="question-text">
              {questions ? questions[currentQuestion].questionText : null}
            </div>
            <br />
          </div>
          <div className="answer-section">
            {questions
              ? questions[currentQuestion].answerOptions.map((answerOption) => (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                    style={{
                      fontFamily: "inherit",
                      fontSize: "20px",
                      textTransform: "none",
                    }}
                  >
                    {answerOption.answerText}
                  </Button>
                ))
              : null}
          </div>
        </>
      )}
      <Button
        size="small"
        onClick={props.flipHandler}
        style={{ fontFamily: "inherit", fontSize: "20px" }}
      >
        End Quiz
      </Button>
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "0%",
        }}
      >
        <Confetti active={confetti} config={config} />
      </div>
    </div>
  );
}
