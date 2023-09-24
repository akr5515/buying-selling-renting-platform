import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const GET_CATEGORIES = gql`
  query GetAllCategories {
    getCategories {
      id
      name
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateOneProduct(
    $title: String!
    $description: String!
    $categories: [Int!]!
    $price: Float!
    $rent: Float!
    $rentInterval: String!
    $ownerId: String!
  ) {
    createProduct(
      title: $title
      description: $description
      categories: $categories
      price: $price
      rent: $rent
      rentInterval: $rentInterval
      ownerId: $ownerId
    ) {
      id
      title
    }
  }
`;

const EditProduct = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const {
    loading,
    error,
    data: categoriesData,
    refetch,
  } = useQuery(GET_CATEGORIES);
  const [CreateOneProduct, { data: ProductData, error: productError }] =
    useMutation(CREATE_PRODUCT);
  // console.log("The created product", ProductData, productError);

  const [categories, setCategories] = useState([]);
  //   console.log("Categories data ", categoriesData);
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.getCategories);
    }
  }, [categoriesData]);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      categories: [],
      description: "",
      price: "",
      rent: "",
      rentInterval: "",
    },
  });

  const onClickHandler = async (data) => {
    const { title, categories, description, price, rent, rentInterval } = data;
    // console.log("The submitted data ", data);
    const ownerId = localStorage.getItem("userId");
    const responseData = await CreateOneProduct({
      variables: {
        title,
        categories,
        description,
        price: parseFloat(price),
        rent: parseFloat(rent),
        rentInterval,
        ownerId,
      },
    });
    if (responseData) {
      navigate("/my-products");
    }
  };

  const backBtnHandler = () => {
    setPageNumber((page) => page - 1);
  };
  const nextBtnHandler = () => {
    setPageNumber((page) => page + 1);
    const summary = getValues("title");
    console.log("the summary ", summary);
  };

  //   const categories = [
  //     { id: 1, name: "ELECTRONICS" },
  //     { id: 2, name: "FURNITURE" },
  //     { id: 3, name: "HOME" },
  //     { id: 4, name: "APPLIANCES" },
  //     { id: 5, name: "SPORTING GOODS" },
  //     { id: 6, name: "OUTDOOR" },
  //   ];

  const rentIntervals = ["1 day", "3 days", "1 week", "1 month"];

  useEffect(() => {
    console.log("Field errors ", errors);
  }, [errors]);

  return (
    <Box className="container">
      <Box className="login-container">
        {/* <Box > */}
        <Typography variant="h4">Edit your product</Typography>
        <form
          style={{ border: "none" }}
          className="login-input-containers"
          onSubmit={handleSubmit((data) => onClickHandler(data))}
        >
          <Box>
            <Typography>Title</Typography>
            <Controller
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Title"
                  className="text-input"
                  {...field}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                />
              )}
            />
          </Box>
          <Box>
            <Typography>Categories</Typography>
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              rules={{ required: "Category is required" }}
              render={({ field, fieldState }) => (
                <FormControl style={{ width: "20rem" }}>
                  <InputLabel>Categories</InputLabel>
                  <Select
                    {...field}
                    labelId="age"
                    label="age"
                    multiple
                    defaultValue={[]}
                    error={!!fieldState.error}
                    // helperText={
                    //   fieldState.error ? fieldState.error.message : null
                    // }
                  >
                    {categories.length &&
                      categories.map(
                        (category: { id: number; name: string }) => (
                          <MenuItem value={category.id} key={category.id}>
                            {category.name}
                          </MenuItem>
                        )
                      )}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box>
            <Typography>Description</Typography>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Provide some description" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Description"
                  className="text-input"
                  {...field}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                />
              )}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Select price</Typography>

            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <TextField label="Price" className="text-input" {...field} />
              )}
            />
            <Controller
              control={control}
              name="rent"
              render={({ field }) => (
                <TextField label="Rent" className="text-input" {...field} />
              )}
            />
            <Controller
              name="rentInterval"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl style={{ width: "20rem" }}>
                  <InputLabel>Rent Interval</InputLabel>
                  <Select
                    {...field}
                    labelId="rentInterval"
                    label="rentInterval"
                    defaultValue=""
                  >
                    {rentIntervals.map((rentInterval) => (
                      <MenuItem value={rentInterval} key={rentInterval}>
                        {rentInterval}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          {pageNumber === 4 && (
            <Box>
              <Typography variant="h5">Summary</Typography>
              <Typography>Title: {getValues("title")}</Typography>
              <Typography>Categories: {getValues("categories")}</Typography>
              <Typography>Description: {getValues("description")}</Typography>
              <Typography>Price: {getValues("price")}</Typography>
              <Typography>Rent: {getValues("rent")}</Typography>
            </Box>
          )}
          <Box>
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditProduct;
