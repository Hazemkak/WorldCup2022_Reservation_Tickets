import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../shared/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotLoggedIn from "../guards/NotLoggedIn";
import Register from "../pages/Register";
import FanGuard from "../guards/FanGuard";
import ReservationsList from "../pages/reservations/ReservationsList";
import AdminGuard from "../guards/AdminGuard";
import AdminUsers from "../pages/admin/Users";

function RouterContainer() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="*" element={<>404 not found page</>} />
          <Route path="/" element={<Home />} />

          <Route element={<NotLoggedIn />}>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Route>

          <Route element={<FanGuard />}>
            <Route path="/reservations" element={<ReservationsList />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default RouterContainer;