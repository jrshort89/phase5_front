import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import axios from "axios";

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
    // axios
    //   .post("http://localhost:3000/login", {
    //     user: data,
    //     withCredentials: true,
    //     'Accept': 'application/json',
    //   })
    //   .then((res) => console.log(res));
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
      body: JSON.stringify({ user: data }),
    })
      .then((data) => {
        if (data.status === 401) throw data;
        return data.json();
      })
      .catch((err) => {
        return alert(err.statusText);
        // setTimeout(() => setError(""), 5000);
      })
      .then((user) => {
        props.loginHandler(user.user.username);
        window.sessionStorage.setItem("username", user.user.username);
        window.sessionStorage.setItem("user_id", user.user.id);
        history.push("/lessons");
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
                // ref={register({
                //   required: true,
                // })}
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
          {/* <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                defaultValue={false}
                value="remember"
                name="remember"
                color="primary"
              />
            }
            label="Remember me"
          /> */}
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
