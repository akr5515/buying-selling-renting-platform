import { Box, Button, Typography } from "@mui/material";
import "./allProducts.style.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PRODUCT_BY_ID } from "../constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import CustomDialog from "../components/dialog.component";

const BUY_PRODUCT = gql`
  mutation buyProduct($userId: String!, $productId: String!) {
    buyProduct(productId: $productId, userId: $userId) {
      id
      user {
        id
        firstName
        lastName
      }
      product {
        id
        title
        rent
        rentInterval
      }
    }
  }
`;

const RENT_PRODUCT = gql`
  mutation rentProduct($productId: String!, $userId: String!) {
    rentProduct(
      productId: $productId
      userId: $userId
      startDate: "2023-09-25 05:37:15.421"
      endDate: "2023-09-25 05:37:15.421"
    ) {
      id
    }
  }
`;

const ProductDetails = () => {
  const userId = localStorage.getItem("userId");
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const { productId } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: productId },
    onCompleted: (data) => {
      setProductData(data.getProductById);
    },
  });

  const [buyProduct, { data: boughtProduct }] = useMutation(BUY_PRODUCT);
  const [rentProduct, { data: rentedProduct }] = useMutation(RENT_PRODUCT);

  // dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleBuy = async () => {
    console.log("Bought");
    const boughtData = await buyProduct({
      variables: {
        userId,
        productId,
      },
    });

    console.log("Item bought ", boughtData);
    if (boughtData) {
      navigate("/all-products");
    }
  };

  const handleRent = async () => {
    console.log("rented");

    const rentedData = await rentProduct({
      variables: {
        userId,
        productId,
      },
    });

    console.log("Item bought ", rentedData);
    if (rentedData) {
      navigate("/my-products");
    }
  };

  const [isBuyState, setIsBuyState] = useState(true);

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
          <Button
            variant="contained"
            onClick={() => {
              setIsDialogOpen(true);
              setIsBuyState(true);
            }}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsDialogOpen(true);
              setIsBuyState(false);
            }}
          >
            Rent
          </Button>
        </Box>
      </Box>

      <CustomDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={onDialogClose}
        onClickYes={isBuyState ? handleBuy : handleRent}
        description={
          isBuyState
            ? "Are you sure you want to buy this product?"
            : "Are you sure you want to rent this product?"
        }
      />
    </Box>
  );
};

export default ProductDetails;
