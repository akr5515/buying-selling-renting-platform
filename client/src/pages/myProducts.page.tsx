import { Box, Button, Typography } from "@mui/material";
import "./myProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CardComponent from "../components/card.component";
import { useNavigate } from "react-router-dom";

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

const MyProducts = () => {
  const navigate = useNavigate();
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
  return (
    <Box className="container">
      <Box className="login-container">
        <Box>
          <Typography variant="h4">My Products</Typography>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0px",
            }}
          >
            <Button onClick={() => navigate("/add-product")} variant="outlined">
              Add Product
            </Button>
          </Box>
        </Box>
        <Box>
          {productsData.length > 0 &&
            productsData.map((product) => {
              console.log(product);
              return (
                <CardComponent productData={product} pageSrc="my-products" />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProducts;
