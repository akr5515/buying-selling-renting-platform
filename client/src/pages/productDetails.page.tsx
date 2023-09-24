import { Box, Button, Typography } from "@mui/material";
import "./allProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PRODUCT_BY_ID } from "../constants/constants";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [productData, setProductData] = useState([]);

  const { productId } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: productId },
    onCompleted: (data) => {
      setProductData(data.getProductById);
    },
  });

  console.log("Product data", data, " and the set data is ", productData);

  // console.log("The products data ", productsData, " error ", error);
  return (
    <Box className="container">
      <Box>
        <Box>
          <Typography variant="h4">{productData.title}</Typography>
        </Box>
        <Box>
          <Typography>
            Categories:{" "}
            {productData.categories &&
              productData.categories.map((category, i) => {
                return (
                  <span key={category.id}>
                    {i > 0 ? ", " : ""} {category.name}
                  </span>
                );
              })}
          </Typography>
        </Box>
        <Box>
          <Typography>Price: {productData.price}</Typography>
        </Box>
        <Box>
          <Typography>Description: {productData.description}</Typography>
        </Box>
        <Box>
          <Button variant="contained">Buy</Button>
          <Button variant="contained">Rent</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
