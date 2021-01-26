import React, { useState } from "react";
import Confetti from "react-dom-confetti";
import Button from "@material-ui/core/Button";

export default function ChallengeTests(props) {
  const [results, setResults] = useState([]);
  const [confetti, releaseConfetti] = useState(false);

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

  const testHandler = () => {
    const { tests } = props;
    try {
      let test = Function("return " + props.codeValue)();
      let testResults = tests.map((problem) => {
        let { input, output } = problem;
        input = Function("return " + input)();
        output = Function("return " + output)();
        if (Array.isArray(output)) {
          for (let i = 0; i < output.length; i++) {
            if (test(input)[i] !== output[i]) {
              return "fail";
            }
          }
          releaseConfetti(true);
          return setResults(...results, <li>Pass</li>);
        }
        if (test(input) === Function("return " + output)()) {
          releaseConfetti(true);
          return setResults(...results, <li>Pass</li>);
        } else {
          return "fail";
        }
      });
      // setResults(results);
    } catch {
      return false;
    }
  };

  return (
    <>
      <div>
        <Confetti active={confetti} config={config} />
        <Button variant="outlined" onClick={testHandler}>
          test
        </Button>
        <br />
      </div>
      <ul style={{ display: "flex", justifyContent: "center" }}>{results}</ul>
    </>
  );
}
