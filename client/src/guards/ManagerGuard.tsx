import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLoggedInUser, isLoggedIn } from "../helpers/auth";

function ManagerGuard() {
  let location = useLocation();
  return !isLoggedIn() && !(getLoggedInUser()?.role === "1") ? (
    <Navigate to="/auth/login" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default ManagerGuard;
