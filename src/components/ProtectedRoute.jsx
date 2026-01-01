import React, { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookies.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
