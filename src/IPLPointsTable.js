import React from "react";
import Table from "react-bootstrap/Table";
import "./IplPointsTable.css"; // Add custom styles here

const IplPointsTable = ({ points }) => {
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
            </tr>
          </thead>
          <tbody>
            {points.map((team, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="team-cell">
                  <span>{team.team}</span>
                </td>
                <td>{team.matchesPlayed}</td>
                <td>{team.matchesWon}</td>
                <td>{team.matchesLost}</td>
                <td>{team.matchesTied}</td>
                <td>{team.netRunRate}</td>
                <td className="points">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  );
};

export default IplPointsTable;
