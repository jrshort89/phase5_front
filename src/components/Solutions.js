import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions/solutions";
import axios from "../axios";

export default function Solutions() {
  //   const dispatch = useDispatch();
  //   dispatch(actions.setSolutions());
  //   const challengeSolutions = useSelector((state) => state.solutions);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    axios.get("/solutions").then((res) => {
      setSolutions(res.data);
    });
  }, []);

  const lists =
    solutions.length > 0
      ? solutions.map((solution) => (
          <>
            <li key={solution.lesson.name}>{solution.lesson.name}</li>
            <li key={solution.lesson.text}>{solution.lesson.text}</li>
            {/* <li key={solution.lesson.name}>{solution.text}</li> */}
          </>
        ))
      : [];

  return (
    <div>
      {lists}
      <div>solutions</div>
    </div>
  );
}
