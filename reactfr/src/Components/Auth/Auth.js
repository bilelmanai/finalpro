import React from "react";
import style from "./Style";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../Api/api";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Container,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icons";
import { useHistory } from "react-router-dom";
import { login, signUp } from "../../Action/Users";
import { Snackbar } from "@material-ui/core";

// import MuiAlert from "@material-ui/lab/Alert";
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const err = useSelector((state) =>
    state.Auth.authData ? JSON.parse(localStorage.getItem("error")) : null
  );
  const [hundlError, sethundlError] = useState(
    JSON.parse(localStorage.getItem("error"))
  );
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "auth", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const field = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    logInPassword: "",
    cPasword: "",
  };
  const [userData, setUserData] = useState(field);
  const [open, setOpen] = useState(false);
  const googleFailure = (error) => {
    console.log("failed");
    console.log(error);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (err) {
      sethundlError(JSON.parse(localStorage.getItem("error")));
      setOpen(true);
    }
  }, [err]);
  const logData = async (e) => {
    e.preventDefault();
    if (isLog) {
      dispatch(signUp(userData, history));
    } else {
      dispatch(login(userData, history));
    }
    if (JSON.parse(localStorage.getItem("error"))) {
      setTimeout(() => {
        setOpen(true);
      }, 800);
    }
  };

  const classes = style();
  const [isLog, setIsLog] = useState(false);
  const switchMode = () => setIsLog(!isLog);
  const [password, setpassword] = useState(false);
  const handleClickShowPassword = () => setpassword(!password);
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLog ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={logData}>
          <Grid container spacing={2}>
            {isLog && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  onChange={onChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  onChange={onChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adress"
              onChange={onChange}
              type="email"
            />
            <Input
              name={isLog ? "password" : "logInPassword"}
              label="Password"
              type={password ? "text" : "password"}
              onChange={onChange}
              handleClickShowPassword={handleClickShowPassword}
            />
            {isLog && (
              <Input
                name="cPasword"
                label="cPassword"
                type="password"
                onChange={onChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLog ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        {!isLog && (
          <GoogleLogin
            clientId="28416539569-4b6086edk66lcclsqaes2apbonks9roe.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Icon />}
              >
                Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        )}
        <div className={classes.root}>
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            // key={vertical + horizontal}
            // anchorOrigin={{ vertical: "-600px", horizontal: "right" }}
          >
            <Alert severity="error" onClose={handleClose}>
              {hundlError}
            </Alert>
          </Snackbar>
        </div>
        <Grid container justifyContent="flex-end" className={classes.changeAcc}>
          <Grid item>
            <Button onClick={switchMode}>
              {isLog
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
