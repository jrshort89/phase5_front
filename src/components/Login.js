import React from "react";

import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../redux/actionsTypes";

function Login() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();

  //   const loginRequest = (event) => {
  //     event.preventDefault();
  //     fetch("http://localhost:3000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         user: {
  //           username,
  //           password,
  //         },
  //       }),
  //     })
  //       .then((resp) => {
  //         if (resp.status === 401) throw resp;
  //         return resp.json();
  //       })
  //       .then((user) => {
  //         // props.login(true);
  //         // onSetUsername(user.user);
  //         // onSetUserId(user.uid);
  //       })
  //       .catch((err) => {
  //         // setError(err.statusText);
  //         // setTimeout(() => setError(""), 5000);
  //       });
  //   };

  return (
    <>
      <div>{loggedIn ? "logged in" : "not logged in"}</div>
      <button onClick={() => dispatch({ type: actionTypes.LOGGED_IN })}>
        Toggle Login
      </button>
    </>
  );
}

export default Login;
