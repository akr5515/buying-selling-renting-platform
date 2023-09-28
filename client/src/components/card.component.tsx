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

const CardComponent = ({ productData, pageSrc = "" }) => {
  const navigate = useNavigate();
  console.log("Product from card", productData);
  const dateTime = new Date(productData.createdAt ? productData.createdAt : "");
  const formatDate = `${dateTime.getDate()}-${
    dateTime.getMonth() + 1
  }-${dateTime.getFullYear()}`;
  return (
    <Box
      className="card-container"
      sx={{ margin: "10px 0 15px 0", boxShadow: "3px 3px 10px 0px #817b7b" }}
    >
      <Card
        sx={{ minWidth: 275 }}
        onClick={() => {
          if (pageSrc) {
            navigate(
              pageSrc === "all-products"
                ? `/all-products/${productData.id}`
                : `/my-products/${productData.id}`
            );
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                {productData.title}
              </Typography>
            </Box>

            {pageSrc !== "all-products" && <Button>Delete</Button>}
          </Box>
          <Box>
            <Typography sx={{ color: "#817b7b" }}>The categories: </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "#817b7b" }}>
              Price: {productData.price} , Rent: {productData.rent}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ marginTop: "15px", marginBottom: "15px" }}>
              {productData.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ color: "#817b7b", fontSize: "12px" }}>
                Date posted: {formatDate}
              </Typography>
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
