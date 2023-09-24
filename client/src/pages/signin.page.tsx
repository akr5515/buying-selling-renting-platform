import React, { useState } from "react";
import "./signin.style.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/loading.component";
import { LOGIN_USER } from "../constants/constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const { data, error, loading, refetch } = useQuery(LOGIN_USER);

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
        navigate("/all-products");
      }
    } catch (error) {
      console.log("Some error occured", error);
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
          onSubmit={handleSubmit((data) => onClickHandler(data))}
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
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Sign In
          </Button>
          <Box>
            <Typography>Dont have an account?</Typography>{" "}
            <Button onClick={() => navigate("/sign-up")}>Signup</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
