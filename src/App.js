import * as actionTypes from "./redux/actions";
import { connect } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <div>{props.loggedIn ? "logged in" : "not logged in"}</div>
      <button onClick={props.onSetLogin}>Toggle Login</button>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetLogin: () => dispatch({ type: actionTypes.LOGGED_IN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
