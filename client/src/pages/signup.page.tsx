import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_USER } from "../constants/constants";
import { SnackbarContext } from "../App";
import PasswordInput from "../components/passwordInput.component";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setSnackbarOpen, setSnackbarMsg, setAlertColor } =
    useContext(SnackbarContext);
  const [createUser, { data, loading, error }] = useMutation(SIGN_UP_USER);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onClickHandler = async (data) => {
    const { firstName, lastName, email, phoneNumber, address, password } = data;

    console.log(data);
    try {
      const userData = await createUser({
        variables: {
          firstName,
          lastName,
          email,
          phone: phoneNumber,
          address,
          password,
        },
      });

      if (userData) {
        setAlertColor("success");
        setSnackbarOpen(true);
        setSnackbarMsg("SignUp successful!!!");
        navigate("/sign-in");
      }
    } catch (error) {
      setAlertColor("error");
      setSnackbarOpen(true);
      setSnackbarMsg("SignUp failed! Please fill up form properly.");
    }
  };

  return (
    <Box className="container">
      <Box className="login-container">
        <Typography variant="h4">SIGN UP</Typography>
        {/* <Box > */}
        <form
          className="login-input-containers"
          style={{
            marginTop: "10px",
          }}
          onSubmit={handleSubmit((data) => onClickHandler(data))}
        >
          <Box
            sx={{
              height: "310px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Controller
                control={control}
                name="firstName"
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    label="First Name"
                    required
                    className="text-input"
                    style={{ width: "49%" }}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <TextField
                    label="Last Name"
                    required
                    className="text-input"
                    style={{ width: "49%" }}
                    {...field}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextField
                    label="Address"
                    style={{ width: "100%" }}
                    className="text-input"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    label="Email"
                    required
                    style={{ width: "49%" }}
                    className="text-input"
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <TextField
                    label="Phone Number"
                    style={{ width: "49%" }}
                    className="text-input"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <PasswordInput label="Password" {...field} />
                )}
              />
            </Box>
            <Box sx={{ marginTop: "5px" }}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <PasswordInput label="ConfirmPassword" {...field} />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Register
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Typography>Already have an account?</Typography>{" "}
            <Button sx={{ padding: "0" }} onClick={() => navigate("/sign-in")}>
              Signin
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
