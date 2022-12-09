import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn } from "../helpers/auth";

function NotLoggedIn() {
  let location = useLocation();
  return isLoggedIn() ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default NotLoggedIn;
