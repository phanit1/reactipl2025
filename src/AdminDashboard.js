// // src/components/AdminPanel.js
// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";
import { users } from "./data";

// const AdminDashboard = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const loggedInUser = location.state?.user;

//     const handleLogout = () => {
//         // Clear any user-related state or storage if needed
//         navigate("/"); // Redirect to the homepage or login page
//     };

//     return (
//         <div className="admin-panel">
//             <div className="header">
//                 {/* <h2>Welcome, {loggedInUser?.email || "Admin"}</h2> */}
//                 <button className="logout-button" onClick={handleLogout}>
//                     Logout
//                 </button>
//             </div>

//             <div className="table-wrapper"></div>
//                 <h3>Users & Bets Overview</h3>
//                 {users.map((user, idx) => (
//                     <div key={idx} className="user-section">
//                         <h4>User: {user.email}</h4>
//                         <table className="bets-table">
//                             <thead>
//                                 <tr>
//                                     <th>Match</th>
//                                     <th>Bet Types</th>
//                                     <th>Toss Winner</th>
//                                     <th>Match Winner</th>
//                                     <th>Amount (₹)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {user.bets.map((bet, i) => (
//                                     <tr key={i}>
//                                         <td>{bet.match}</td>
//                                         <td>{bet.betType.join(", ")}</td>
//                                         <td>{bet.tossWinner || "-"}</td>
//                                         <td>{bet.matchWinner || "-"}</td>
//                                         <td>{bet.amount}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ))}
//             </div>
//     );
// };

// export default AdminDashboard;
// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
//   const [data, setData] = useState(users);
    const navigate = useNavigate();


//   useEffect(() => {
//     fetch("http://localhost:5000/api/admin/bets") // Adjust endpoint
//       .then((res) => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

    const handleLogout = () => {
        // Clear any user-related state or storage if needed
        navigate("/"); // Redirect to the homepage or login page
    };

  return (
    <div className="admin-dashboard">
        <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
      <h2>Admin Dashboard – All Bets</h2>

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

      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th,
        .admin-table td {
          border: 1px solid #ccc;
          padding: 12px;
          text-align: center;
        }
        .admin-table th {
          background-color: #1e3a8a;
          color: white;
        }
        @media (max-width: 768px) {
          .admin-table {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
