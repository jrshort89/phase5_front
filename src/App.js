import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Lessons from "./containers/Lessons";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const loggedIn =
    useSelector((state) => state.login.loggedIn);

  let routes = (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      {/* <Redirect to="/signin" /> */}
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {routes}
        {/* <Switch>
          {loggedIn ? (
            <Route path="/lessons">
              <Lessons />
            </Route>
          ) : (
            <Redirect to="/login" />
          )}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*" exact={true}>
            404 not found
          </Route>
        </Switch> */}
      </Router>
    </ThemeProvider>
  );
}
