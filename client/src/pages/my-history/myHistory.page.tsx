import { Route, Routes } from "react-router-dom";
import PurchasedProducts from "./components/purchasedProducts.component";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import SoldProducts from "./components/soldProducts.component";
import RentedProducts from "./components/rentedProducts.component";
import LentProducts from "./components/lentProducts.component";

const MyHistoryPage = () => {
  const navItems = [
    { name: "Purchased", path: "purchased" },
    { name: "Sold", path: "sold" },
    { name: "Rented", path: "rented" },
    { name: "Lent", path: "lent" },
  ];

  const [showContent, setShowContent] = useState("purchased");

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        {navItems.map((item, i) => {
          return (
            <Box key={i}>
              <Button onClick={() => setShowContent(item.path)}>
                {item.name}
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        {showContent === "purchased" && <PurchasedProducts />}
        {showContent === "sold" && <SoldProducts />}
        {showContent === "rented" && <RentedProducts />}
        {showContent === "lent" && <LentProducts />}
      </Box>
    </Box>
  );
};

export default MyHistoryPage;
