import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const SIGN_UP_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $phone: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      phone: $phone
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const SignUpPage = () => {
  const [createUser, { data, loading, error }] = useMutation(SIGN_UP_USER);
  console.log("The graph data is ", data, " and error state ", error);

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
    await createUser({
      variables: {
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        address,
        password,
      },
    });
  };

  return (
    <Box className="container">
      <Box className="login-container">
        <Typography variant="h4">SIGN UP</Typography>
        {/* <Box > */}
        <form
          className="login-input-containers"
          onSubmit={handleSubmit((data) => onClickHandler(data))}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Controller
              control={control}
              name="firstName"
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  label="First Name"
                  className="text-input"
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
                  className="text-input"
                  {...field}
                />
              )}
            />
          </Box>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextField label="Address" className="text-input" {...field} />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField label="Email" className="text-input" {...field} />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <TextField
                  label="Phone Number"
                  className="text-input"
                  {...field}
                />
              )}
            />
          </Box>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField label="Password" className="text-input" {...field} />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                label="Confirm Password"
                className="text-input"
                {...field}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
