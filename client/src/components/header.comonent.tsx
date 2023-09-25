import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const navItems = [
    { name: "All Products", path: "/all-products" },
    { name: "My Products", path: "/my-products" },
    { name: "My History", path: "/my-history" },
    { name: "Logout", path: "/sign-in" },
  ];

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          TeeBay
        </Typography>
        {userId && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, i) => (
              <Button
                key={i}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                  if (item.name === "Logout") {
                    localStorage.removeItem("userId");
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
