import React from "react";
import "./signin.style.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { gql, useQuery } from "@apollo/client";

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;

const LoginPage = () => {
  const { data, error, loading, refetch } = useQuery(LOGIN_USER);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onClickHandler = async (data) => {
    const { email, password } = data;
    try {
      const loginData = await refetch({ email, password });

      console.log("The login user", loginData.data);
      localStorage.setItem(
        "userId",
        loginData.data.loginUser.id ? loginData.data.loginUser.id : ""
      );
    } catch (error) {
      console.log("Some error occured", error);
    }
  };

  return (
    <Box className="container">
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
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
