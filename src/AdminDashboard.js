import React from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./data";
import "./AdminDashboard.css"; // Assuming you have a CSS file for styling

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [view, setView] = React.useState("bets");

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="admin-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Admin Dashboard</h2>

      <div className="view-buttons" align="center">
        <button onClick={() => handleViewChange("users")}>Users</button>
        <button onClick={() => handleViewChange("bets")}>Bets Placed</button>
      </div>

      {view === "users" ? (
        <div className="users-view">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bets-view">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Match</th>
                <th>Bet Type</th>
                <th>Bet On</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((entry) =>
                entry.bets.map((bet, betIndex) =>
                  bet.type.map((type, typeIndex) => (
                    <tr key={`${entry.email}-${betIndex}-${typeIndex}`}>
                      <td>{entry.email}</td>
                      <td>{bet.match}</td>
                      <td>{type}</td>
                      <td>
                        {type === "Toss Winner"
                          ? bet.tossWinner
                          : type === "Match Winner"
                          ? bet.matchWinner
                          : "-"}
                      </td>
                      <td>{bet.amount}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
