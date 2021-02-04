import React, { useState, useEffect } from "react";
import axios from "../axios";

export default function Solutions() {
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div key={solution.lesson.name}>{solution.lesson.name}</div>
              <div key={solution.lesson.text}>{solution.text}</div>
            </div>
            <br />
          </>
        ))
      : [];

  return (
    <div
      style={{
        fontFamily: "inherit",
        fontSize: "20px",
      }}
    >
      <h2>Solutions</h2>
      {lists}
    </div>
  );
}
