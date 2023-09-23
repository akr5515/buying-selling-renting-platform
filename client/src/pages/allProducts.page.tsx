import { Box, Typography } from "@mui/material";
import "./allProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import CardComponent from "../components/card.component";

const ALL_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      title
      description
      categories {
        id
      }
      price
      rent
      rentInterval
      createdAt
      updatedAt
      ownerId
    }
  }
`;

const AllProducts = () => {
  const [productsData, setProductsData] = useState([]);

  const { loading, error, data, refetch } = useQuery(ALL_PRODUCTS, {
    onCompleted: (data) => {
      setProductsData(data.getProducts);
    },
  });

  console.log("The products data ", productsData, " error ", error);
  return (
    <Box className="container">
      <Box className="login-container">
        <Typography variant="h4">All Products</Typography>
        <Box>
          {productsData.length > 0 &&
            productsData.map((product) => {
              console.log(product);
              return <CardComponent productData={product} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default AllProducts;
