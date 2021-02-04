import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actionTypes from "../redux/actionsTypes";

function Login() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();

  return (
    <>
      <div>{loggedIn ? <Redirect to="/lessons" /> : "not logged in"}</div>
      <Link to="/signup">Sign up!</Link>
      <button onClick={() => dispatch({ type: actionTypes.LOGGED_IN })}>
        Toggle Login
      </button>
    </>
  );
}

export default Login;
