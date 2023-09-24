import { Box, Typography } from "@mui/material";
import "./allProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CardComponent from "../components/card.component";
import { ALL_PRODUCTS } from "../constants/constants";

const ProductDetails = () => {
  const [productsData, setProductsData] = useState([]);

  const { loading, error, data, refetch } = useQuery(ALL_PRODUCTS, {
    onCompleted: (data) => {
      setProductsData(data.getProducts);
    },
  });
  useEffect(() => {
    refetch();
  }, []);

  console.log("The products data ", productsData, " error ", error);
  return <Box className="container">Product Details are here</Box>;
};

export default ProductDetails;
