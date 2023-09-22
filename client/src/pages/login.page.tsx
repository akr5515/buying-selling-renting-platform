import React from "react";
import "./login.style.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
const LoginPage = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box className="container">
      <Box className="login-container">
        <Typography variant="h4">SIGN IN</Typography>
        <form
          className="login-input-containers"
          onSubmit={handleSubmit((data) => console.log(data))}
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
