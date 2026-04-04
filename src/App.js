import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import MatchInfo from "./MatchInfo";

function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__orb app-shell__orb--gold" />
      <div className="app-shell__orb app-shell__orb--blue" />
      <div className="app-shell__orb app-shell__orb--teal" />
      <div className="app-shell__grid" />
      <main className="app-shell__content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/match-info/:matchId" element={<MatchInfo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
