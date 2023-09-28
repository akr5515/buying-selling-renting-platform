import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/signin.page";
import SignUpPage from "./pages/signup.page";
import AllProducts from "./pages/allProducts.page";
import MyProducts from "./pages/myProducts.page";
import HeaderComponent from "./components/header.comonent";
import { AlertColor, Box } from "@mui/material";
import AddProduct from "./pages/addProduct.page";
import AuthRoute from "./utils/authRoute";
import EditProduct from "./pages/editProduct.page";
import ProductDetails from "./pages/productDetails.page";
import PurchasedProducts from "./pages/my-history/components/purchasedProducts.component";
import MyHistoryPage from "./pages/my-history/myHistory.page";
import { createContext, useEffect, useState } from "react";
import CustomSnackbar from "./components/customSnackbar.component";
import { getUserId } from "./utils/helpers";

export const SnackbarContext = createContext();

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [alertColor, setAlertColor] = useState<AlertColor>("success");
  const navigate = useNavigate();

  const userId = getUserId();

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 2000);
    }
  }, [snackbarOpen]);
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <HeaderComponent />
      <SnackbarContext.Provider
        value={{ setSnackbarOpen, setSnackbarMsg, setAlertColor }}
      >
        <Box sx={{ marginTop: "100px" }}>
          <Routes>
            {!userId && (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
              </>
            )}
            <Route element={<AuthRoute />}>
              <Route path="/all-products" element={<AllProducts />} />
              <Route
                path="/all-products/:productId"
                element={<ProductDetails />}
              />
              <Route path="/my-products" element={<MyProducts />} />
              <Route path="/my-products/:productId" element={<EditProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route
                path="/purchased-products"
                element={<PurchasedProducts />}
              />
              <Route path="/my-history" element={<MyHistoryPage />} />
            </Route>
          </Routes>
        </Box>

        <CustomSnackbar
          openState={snackbarOpen}
          snackbarMessage={snackbarMsg}
          alertColor={alertColor}
          handleClose={handleCloseSnackbar}
        />
      </SnackbarContext.Provider>
    </>
  );
}

export default App;
