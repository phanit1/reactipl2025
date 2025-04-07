import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
