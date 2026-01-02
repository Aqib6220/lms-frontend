import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// roles: optional array of allowed roles (e.g., ['admin'])
const ProtectedRoute = ({ roles = [] }) => {
  const token = Cookies.get("token");
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  // Not authenticated
  if (!token) return <Navigate to="/" replace />;

  // If roles specified, check user's role (case-insensitive)
  if (roles.length) {
    const normalizedRoles = roles.map((r) => r.toString().toLowerCase());
    const userRole = (user?.role || "").toString().toLowerCase();
    if (!normalizedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
