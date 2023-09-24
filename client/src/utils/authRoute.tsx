import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const userId = localStorage.getItem("userId");

  return userId ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default AuthRoute;
