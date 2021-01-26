import React, { useState, useEffect } from "react";
import CardFlip from "../components/CardFlip";
import axios from "../axios";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizCards, setQuizCards] = useState([]);

  useEffect(() => {
    axios.get("/quizzes").then((res) => {
      setQuizCards(
        res.data.map((quiz) => {
          return <CardFlip quizName={quiz.name} questions={quiz.questions} />;
        })
      );
    });
  }, []);

  return <div>{quizCards}</div>;
}
