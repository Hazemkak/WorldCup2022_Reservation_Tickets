import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../shared/Layout";
import AdminGuard from "../guards/AdminGuard";
import ManagerGuard from "../guards/ManagerGuard";
import FanGuard from "../guards/FanGuard";
import NotLoggedIn from "../guards/NotLoggedIn";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminUsers from "../pages/admin/Users";
import ManagerPanel from "../pages/manager/ManagerPanel";
import Profile from "../pages/fan/Profile";
import MatchList from "../pages/matches/MatchList";
import MatchDetails from "../pages/matches/MatchDetails";
import MatchReservations from "../pages/matchReservations";
import ManagerMatchDetails from "../pages/manager/ManagerMatchDetails";
import CreateMatch from "../pages/manager/CreateMatch";

function RouterContainer() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="*" element={<>404 not found page</>} />
                    <Route path="/" element={<Home />} />
                    <Route path="/matches" element={<MatchList />} />
                    <Route
                        path="/matches/:match_id"
                        element={<MatchDetails />}
                    />

                    <Route element={<NotLoggedIn />}>
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                    </Route>

                    <Route element={<FanGuard />}>
                        <Route
                            path="/match/reservations/:match_id"
                            element={<MatchReservations />}
                        />
                        <Route
                            path="/profile/:username"
                            element={<Profile />}
                        />
                    </Route>

                    <Route element={<ManagerGuard />}>
                        <Route
                            path="/manager/panel"
                            element={<ManagerPanel />}
                        />
                        <Route
                            path="/manager/matches/create"
                            element={<CreateMatch />}
                        />
                        <Route
                            path="/manager/matches/:match_id"
                            element={<ManagerMatchDetails />}
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
