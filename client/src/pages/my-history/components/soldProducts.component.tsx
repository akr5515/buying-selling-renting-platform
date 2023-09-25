import { Box, Button, Typography } from "@mui/material";
// import "./myProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CardComponent from "../../../components/card.component";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../../utils/helpers";

const SOLD_PRODUCTS = gql`
  query getSoldProducts($userId: String!) {
    productsSoldByUser(userId: $userId) {
      id
      title
      description
      price
      rent
      categories {
        id
        name
      }
      owner {
        email
        firstName
        lastName
      }
    }
  }
`;

const SoldProducts = () => {
  const userId = getUserId();
  const [productsData, setProductsData] = useState([]);

  const { loading, error, data, refetch } = useQuery(SOLD_PRODUCTS, {
    variables: { userId: userId },
    onCompleted: (data) => {
      setProductsData(data.productsSoldByUser);
    },
  });
  useEffect(() => {
    refetch();
  }, []);

  console.log("The products data ", productsData, " error ", error);
  return (
    <Box className="container">
      <Box className="login-container">
        <Box>
          <Typography variant="h4">Sold Products</Typography>{" "}
        </Box>
        <Box>
          {productsData &&
            productsData.length > 0 &&
            productsData.map((product) => {
              console.log(product);
              return <CardComponent productData={product} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default SoldProducts;
