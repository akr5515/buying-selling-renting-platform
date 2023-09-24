import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: "All Products", path: "/all-products" },
    { name: "My Products", path: "/my-products" },
    { name: "Logout", path: "/sign-in" },
  ];

  return (
    <AppBar component="nav">
      <Toolbar>
        {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          MUI
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item, i) => (
            <Button
              key={i}
              sx={{ color: "#fff" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
