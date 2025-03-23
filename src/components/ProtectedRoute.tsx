/* eslint-disable react/prop-types */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check for token in sessionStorage
  const token = sessionStorage.getItem("token");
  const isAuthenticated = !!token; // Convert to boolean

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
