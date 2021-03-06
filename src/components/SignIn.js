import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "../axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.jacobryanshort.com"
        target="_blank"
      >
        jacobryanshort.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const { register, handleSubmit, errors, control } = useForm();
  const classes = useStyles();
  let history = useHistory();

  const onSubmitHandler = (data) => {
    return axios
      .post("https://phase5-deploy.herokuapp.com/login", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
        user: data,
      })
      .then((res) => {
        if (res.status === 401) throw data;
        console.log(res.data);
        props.loginHandler(res.data.user.username);
        window.sessionStorage.setItem("username", res.data.user.username);
        window.sessionStorage.setItem("user_id", res.data.user.id);
        return history.push("/lessons");
      })
    .catch((err) => {
      return alert(err.statusText);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Controller
            as={
              <TextField
                type="input"
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                required
                inputRef={register}
              />
            }
            name="email"
            control={control}
            rules={{ required: true }}
          />
          {errors.email && (
            <Alert variant="outlined" severity="error">
              Email is required!
            </Alert>
          )}
          <Controller
            as={
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                ref={register({
                  required: true,
                })}
                inputRef={register}
              />
            }
            name="password"
            control={control}
            rules={{ required: true }}
          />
          {errors.password && (
            <Alert variant="outlined" severity="error">
              Password is required!
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
