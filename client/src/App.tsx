import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminUsers from "./pages/admin/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";
import Layout from "./shared/Layout";
import ReservationsList from "./pages/reservations/ReservationsList";
import AlertContextProvider from "./context/AlertContext";
import AlertMessage from "./shared/Alerts/Alert";

function App() {
  return (
    <AlertContextProvider>
      <>
        <AlertMessage />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/reservations" element={<ReservationsList />} />
            </Routes>
          </Layout>
        </Router>
      </>
    </AlertContextProvider>
  );
}

export default App;
