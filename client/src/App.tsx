import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/signin.page";
import SignUpPage from "./pages/signup.page";
import AllProducts from "./pages/allProducts.page";
import MyProducts from "./pages/myProducts.page";
import HeaderComponent from "./components/header.comonent";
import { Box } from "@mui/material";
import AddProduct from "./pages/addProduct.page";

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
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
