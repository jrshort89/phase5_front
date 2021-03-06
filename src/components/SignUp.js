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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const { register, handleSubmit, errors, control } = useForm();
  const classes = useStyles();
  let history = useHistory();

  const onSubmitHandler = (data) => {

    return axios
      .post("https://phase5-deploy.herokuapp.com/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        user: data,
      })
      .then((res) => {
        if (res.status === 401) throw res;
        props.loginHandler(res.data.user.username);
        window.sessionStorage.setItem("username", res.data.user.username);
        window.sessionStorage.setItem("user_id", res.data.user.id);
        history.push("/lessons");
        return res;
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
        <Link to="/signin">
          Sign up
        </Link>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    autoComplete="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    inputRef={register}
                    ref={register({
                      required: true,
                    })}
                  />
                }
                name="first_name"
                control={control}
                rules={{ required: true }}
              />
              {errors.first_name && (
                <Alert variant="outlined" severity="error">
                  First name is required!
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="lname"
                    inputRef={register}
                    ref={register({
                      required: true,
                    })}
                  />
                }
                name="last_name"
                control={control}
                rules={{ required: true }}
              />
              {errors.last_name && (
                <Alert variant="outlined" severity="error">
                  Last name is required!
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    inputRef={register}
                    ref={register({
                      required: true,
                    })}
                  />
                }
                name="username"
                control={control}
                rules={{ required: true }}
              />
              {errors.username && (
                <Alert variant="outlined" severity="error">
                  Email is required!
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register}
                    ref={register({
                      required: true,
                      minLength: 6,
                    })}
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
