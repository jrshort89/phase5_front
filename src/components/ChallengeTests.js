import React, { useState } from "react";

export default function ChallengeTests(props) {
  const [results, setResults] = useState([]);

  const testHandler = () => {
    const { tests } = props;
    try {
      let test = Function("return " + props.codeValue)();
      let results = tests.map((problem) => {
        let { input, output } = problem;
        input = Function("return " + input)();
        output = Function("return " + output)();
        if (Array.isArray(output)) {
          for (let i = 0; i < output.length; i++) {
            if (test(input)[i] !== output[i]) {
              return "fail";
            }
          }
          return "pass";
        }
        return test(input) === Function("return " + output)() ? "pass" : "fail";
      });
      setResults(results);
    } catch {
      return false;
    }
  };
  return (
    <div>
      <div>{results}</div>
      <button onClick={testHandler}>test</button>
    </div>
  );
}
