import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Lessons from "./containers/Lessons";

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
  const loggedIn = useSelector((state) => state.login.loggedIn);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {loggedIn ? <Redirect to="/lessons" /> : <Redirect to="/login" />}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/lessons">
            <Lessons />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
