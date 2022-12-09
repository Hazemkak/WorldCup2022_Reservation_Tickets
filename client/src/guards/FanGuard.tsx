import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLoggedInUser, isLoggedIn } from "../helpers/auth";

function FanGuard() {
  console.log("hello");

  let location = useLocation();

  return !isLoggedIn() && !(getLoggedInUser()?.role === "0") ? (
    <Navigate to="/auth/login" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default FanGuard;
