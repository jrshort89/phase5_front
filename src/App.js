import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Lessons from "./containers/Lessons";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import * as actions from "./redux/actions/login";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch = useDispatch();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const loggedIn = useSelector((state) => state.login.loggedIn);

  const loggedInHandler = (username) => {
    dispatch(actions.setLoggedIn());
    dispatch(actions.setUsername(username));
  };

  let routes = (
    <Switch>
      <Route path="/signin">
        <SignIn loginHandler={loggedInHandler} />
      </Route>
      <Route path="/signup">
        <SignUp loginHandler={loggedInHandler} />
      </Route>
      <Route path="*" exact={true}>
        404 not found
      </Route>
    </Switch>
  );

  if (loggedIn) {
    routes = (
      <Switch>
        <Route path="/lessons" component={Lessons} />
        <Redirect to="/lessons" />
        <Route path="*" exact={true}>
          404 not found
        </Route>
      </Switch>
    );
  }

  useEffect(() => {
    if (window.sessionStorage.getItem("username") ? true : false)
      dispatch(actions.setLoggedIn());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>{routes}</Router>
    </ThemeProvider>
  );
}
