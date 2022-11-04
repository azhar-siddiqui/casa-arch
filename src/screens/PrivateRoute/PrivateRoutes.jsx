import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let Token = localStorage.getItem("Token");
  return Token ? <Outlet /> : <Navigate to="/professionals" />;
};

export default PrivateRoutes;
