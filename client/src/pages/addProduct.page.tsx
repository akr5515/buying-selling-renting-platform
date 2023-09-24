import { gql, useQuery } from "@apollo/client";
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

const GET_CATEGORIES = gql`
  query GetAllCategories {
    getCategories {
      id
      name
    }
  }
`;

const AddProduct = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const {
    loading,
    error,
    data: categoriesData,
    refetch,
  } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);
  console.log("Categories data ", categoriesData);
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData.getCategories);
    }
  }, [categoriesData]);

  const { handleSubmit, control, getValues } = useForm({
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

    console.log(data);
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

  return (
    <Box className="container">
      <Box className="login-container">
        {/* <Box > */}
        <form
          style={{ border: "none" }}
          className="login-input-containers"
          onSubmit={handleSubmit((data) => onClickHandler(data))}
        >
          {pageNumber === 0 && (
            <Box>
              <Typography>Select a title for your product</Typography>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <TextField label="Title" className="text-input" {...field} />
                )}
              />
            </Box>
          )}
          {/* {pageNumber === 1 && ( */}
          <Box>
            <Typography>Select categories</Typography>
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl style={{ width: "20rem" }}>
                  <InputLabel>Categories</InputLabel>
                  <Select
                    {...field}
                    labelId="age"
                    label="age"
                    multiple
                    defaultValue={[]}
                  >
                    {categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          {/* )} */}
          {pageNumber === 2 && (
            <Box>
              <Typography>Select description</Typography>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField
                    label="Description"
                    className="text-input"
                    {...field}
                  />
                )}
              />
            </Box>
          )}

          {/* {pageNumber === 3 && ( */}
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
          {/* )} */}
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
            {pageNumber > 0 && (
              <Button
                variant="contained"
                style={{ marginTop: "20px" }}
                onClick={backBtnHandler}
              >
                Back
              </Button>
            )}
            {pageNumber < 4 && (
              <Button
                variant="contained"
                style={{ marginTop: "20px" }}
                onClick={nextBtnHandler}
              >
                Next
              </Button>
            )}
            {pageNumber === 4 && (
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Submit
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
