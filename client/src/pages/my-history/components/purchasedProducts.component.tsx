import { Box, Button, Typography } from "@mui/material";
// import "./myProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CardComponent from "../../../components/card.component";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../../utils/helpers";

const PURCHASED_PRODUCTS = gql`
  query getPurchasedProducts($userId: String!) {
    productsPurchasedByUser(userId: $userId) {
      product {
        id
        title
        description
        price
        rent
      }
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const PurchasedProducts = () => {
  const userId = getUserId();
  const [productsData, setProductsData] = useState([]);

  const { loading, error, data, refetch } = useQuery(PURCHASED_PRODUCTS, {
    variables: { userId: userId },
    onCompleted: (data) => {
      const productsTemp = data.productsPurchasedByUser.map(
        (purchased) => purchased.product
      );
      setProductsData(productsTemp);
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
          <Typography variant="h4">Purchased Products</Typography>{" "}
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

export default PurchasedProducts;
