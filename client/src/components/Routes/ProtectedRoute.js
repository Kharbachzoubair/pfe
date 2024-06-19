// src/components/Routes/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ProtectedRoute = ({ path, ...props }) => {
  const [auth] = useAuth();

  return auth.token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
