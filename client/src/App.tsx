import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminUsers from "./pages/admin/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";

import './App.css';
import Layout from "./shared/Layout";

function App() {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;
