import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/signup.page";
import AllProducts from "./pages/allProducts.page";
import MyProducts from "./pages/myProducts.page";
import HeaderComponent from "./components/header.comonent";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <HeaderComponent />
      <Box sx={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/my-products" element={<MyProducts />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
