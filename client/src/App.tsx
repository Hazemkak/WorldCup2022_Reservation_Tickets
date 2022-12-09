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
import RouterContainer from "./routes/RouterContainer";

function App() {
  return (
    <AlertContextProvider>
      <>
        <AlertMessage />
        <RouterContainer />
      </>
    </AlertContextProvider>
  );
}

export default App;
