import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export default function Quiz(props) {
  const questions = props.questions?.map(
    ({ text, answer, option_one, option_two, option_three }) => {
      const current = {
        questionText: text,
        answerOptions: [
          { answerText: option_one, isCorrect: false },
          { answerText: option_two, isCorrect: false },
          { answerText: answer, isCorrect: true },
          { answerText: option_three, isCorrect: false },
        ],
      };
      return current;
    }
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions?.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="app">
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
            <div className="question-text">
              {questions ? questions[currentQuestion].questionText : null}
            </div>
          </div>
          <div className="answer-section">
            {questions
              ? questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                ))
              : null}
          </div>
        </>
      )}
      <Button size="small" onClick={props.flipHandler}>
        End Quiz
      </Button>
    </div>
  );
}
