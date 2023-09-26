import { Box, Button, Typography } from "@mui/material";
// import "./myProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CardComponent from "../../../components/card.component";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../../utils/helpers";

const LENT_PRODUCTS = gql`
  query productsLentByUser($userId: String!) {
    productsLentByUser(userId: $userId) {
      id
      title
      description
      price
      rent
      rentInterval
      createdAt
      categories {
        id
        name
      }
    }
  }
`;

const LentProducts = () => {
  const userId = getUserId();
  const [productsData, setProductsData] = useState([]);

  const { loading, error, data, refetch } = useQuery(LENT_PRODUCTS, {
    variables: { userId: userId },
    onCompleted: (data) => {
      setProductsData(data.productsLentByUser);
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
          <Typography variant="h4">Lent Products</Typography>{" "}
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

export default LentProducts;
