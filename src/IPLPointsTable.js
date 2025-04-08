import React from "react";
import Table from "react-bootstrap/Table";
import "./IplPointsTable.css"; // Add custom styles here

const IplPointsTable = ({ points }) => {
  if (!points || points.length === 0) {
    return <div>No points data available.</div>;
  }
  return (
    <div className="container-fluid">
        <Table bordered hover striped className="points-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>TEAM</th>
              <th>P</th>
              <th>W</th>
              <th>L</th>
              <th>T</th>
              <th>NRR</th>
              <th>PTS</th>
              <th>PERFORMANCE</th>
            </tr>
          </thead>
          <tbody>
            {points.map((team, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="team-cell">
                  <img
                    src={team.TeamLogo}
                    alt={team.TeamName}
                    className="team-logo"
                    style={{ width: "30px", height: "30px", marginRight: "10px" }}  // Adjust size as needed
                  />
                  <span>{team.TeamName}</span>
                </td>
                <td>{team.Matches}</td>
                <td>{team.Wins}</td>
                <td>{team.Loss}</td>
                <td>{team.Tied}</td>
                <td>{team.NetRunRate}</td>
                <td className="points">{team.Points}</td>
                {team.Performance.includes(",") ? (
                   <td>
                     {team.Performance.split(",").map((performance, index) => (
                       <span key={index} className="performance">{performance === "W" ? "✅ " : "❌ "}</span>
                     ))}
                   </td>
                 ) : (
                   <td className="performance">{team.Performance === "W" ? "✅" : "❌"}</td>
                 )}
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  );
};

export default IplPointsTable;
