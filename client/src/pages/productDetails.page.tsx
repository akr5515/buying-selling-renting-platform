import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import "./allProducts.style.scss";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PRODUCT_BY_ID } from "../constants/constants";
import { useParams } from "react-router-dom";
import CustomDialog from "../components/dialog.component";

const ProductDetails = () => {
  const [productData, setProductData] = useState([]);

  const { productId } = useParams();

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: productId },
    onCompleted: (data) => {
      setProductData(data.getProductById);
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

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
          <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
            Buy
          </Button>
          <Button variant="contained">Rent</Button>
        </Box>
      </Box>

      <CustomDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={onDialogClose}
        description="Are you sure you want to buy this product?"
      />
    </Box>
  );
};

export default ProductDetails;
