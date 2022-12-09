import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../shared/Layout";
import AdminGuard from "../guards/AdminGuard";
import FanGuard from "../guards/FanGuard";
import NotLoggedIn from "../guards/NotLoggedIn";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/fan/Profile";
import AdminUsers from "../pages/admin/Users";
import MatchReservations from "../pages/matchReservations";
import MatchList from "../pages/matches/MatchList";

function RouterContainer() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="*" element={<>404 not found page</>} />
                    <Route path="/" element={<Home />} />
                    <Route path="/matches" element={<MatchList />} />
                    <Route
                        path="/match/reservations/:match_id"
                        element={<MatchReservations />}
                    />

                    <Route element={<NotLoggedIn />}>
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                    </Route>

                    <Route element={<FanGuard />}>
                        <Route
                            path="/profile/:username"
                            element={<Profile />}
                        />
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
