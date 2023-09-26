import React, { useContext, useState } from "react";
import "./signin.style.scss";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/loading.component";
import { LOGIN_USER } from "../constants/constants";
import CustomSnackbar from "../components/customSnackbar.component";
import { SnackbarContext } from "../App";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setSnackbarOpen, setSnackbarMsg, setAlertColor } =
    useContext(SnackbarContext);
  const { data, error, loading, refetch } = useQuery(LOGIN_USER);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("loading state ", loading);
  const [loadingState, setLoadingState] = useState(false);

  const onClickHandler = async (data) => {
    const { email, password } = data;
    setLoadingState(true);
    try {
      const loginData = await refetch({ email, password });

      localStorage.setItem(
        "userId",
        loginData.data.loginUser.id ? loginData.data.loginUser.id : ""
      );
      if (loginData.data) {
        setAlertColor("success");
        setSnackbarOpen(true);
        setSnackbarMsg("Login successful!!!");
        navigate("/all-products");
      }
    } catch (error) {
      setAlertColor("error");
      console.log("Some error occured", error);
      setSnackbarOpen(true);
      setSnackbarMsg("Bad credential!!!");
    }
    setLoadingState(false);
  };

  return (
    <Box className="container">
      {loadingState && <LoadingComponent />}
      <Box className="login-container">
        <Typography variant="h4">SIGN IN</Typography>
        <form
          className="login-input-containers"
          style={{ marginTop: "10px" }}
          onSubmit={handleSubmit((data) => onClickHandler(data))}
        >
          <Box
            style={{
              height: "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Controller
              control={control}
              name="email"
              defaultValue={""}
              render={({ field }) => (
                <TextField label="Email" className="text-input" {...field} />
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue={""}
              render={({ field }) => (
                <TextField label="Password" className="text-input" {...field} />
              )}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              style={{ width: "100px" }}
            >
              Sign In
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Typography>Dont have an account?</Typography>{" "}
            <Button
              sx={{ fontSize: "12px", padding: "0px", marginLeft: "-5px" }}
              onClick={() => navigate("/sign-up")}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
