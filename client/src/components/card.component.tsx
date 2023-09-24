import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ productData, pageSrc }) => {
  const navigate = useNavigate();
  console.log("Product from card", productData);
  return (
    <Box className="card-container">
      <Card
        sx={{ minWidth: 275 }}
        onClick={() =>
          navigate(
            pageSrc === "all-products"
              ? `/all-products/${productData.id}`
              : `/my-products/${productData.id}`
          )
        }
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5">{productData.title}</Typography>
            </Box>

            <Button>Delete</Button>
          </Box>
          <Box>
            <Typography>The categories</Typography>
          </Box>
          <Box>
            <Typography>{productData.price}</Typography>
          </Box>
          <Box>
            <Typography>{productData.description}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography>{productData.createdAt}</Typography>
            </Box>
            <Box>
              <Typography>Views</Typography>
            </Box>
          </Box>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
};

export default CardComponent;
