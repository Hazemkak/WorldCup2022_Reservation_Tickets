import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLoggedInUser, isLoggedIn } from "../helpers/auth";

function AdminGuard() {
  let location = useLocation();
  return !isLoggedIn() && !(getLoggedInUser()?.role === "2") ? (
    <Navigate to="/auth/login" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default AdminGuard;
