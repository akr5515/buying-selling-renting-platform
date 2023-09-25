import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/signin.page";
import SignUpPage from "./pages/signup.page";
import AllProducts from "./pages/allProducts.page";
import MyProducts from "./pages/myProducts.page";
import HeaderComponent from "./components/header.comonent";
import { Box } from "@mui/material";
import AddProduct from "./pages/addProduct.page";
import AuthRoute from "./utils/authRoute";
import EditProduct from "./pages/editProduct.page";
import ProductDetails from "./pages/productDetails.page";
import PurchasedProducts from "./pages/my-history/components/purchasedProducts.component";
import MyHistoryPage from "./pages/my-history/myHistory.page";

function App() {
  return (
    <>
      <HeaderComponent />
      <Box sx={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route element={<AuthRoute />}>
            <Route path="/all-products" element={<AllProducts />} />
            <Route
              path="/all-products/:productId"
              element={<ProductDetails />}
            />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/my-products/:productId" element={<EditProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/purchased-products" element={<PurchasedProducts />} />
            <Route path="/my-history" element={<MyHistoryPage />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
